const FDC_SEARCH_URL = 'https://api.nal.usda.gov/fdc/v1/foods/search';

// Descriptions containing these words are deprioritized unless the user's
// query itself asked for them — keeps "chicken breast" from matching
// "Chicken breast tenders, breaded" and similar processed/snack items.
const BLACKLIST_WORDS = [
	'cracker',
	'cake',
	'chip',
	'snack',
	'cereal',
	'breaded',
	'tender',
	'nugget',
	'batter',
	'drink',
	'beverage',
	'candy',
	'dessert',
	'cookie',
	'frosting',
	'syrup',
	'pudding'
];

const FLAVOR_WORDS = ['blueberry', 'strawberry', 'vanilla', 'chocolate', 'peach', 'mango', 'raspberry'];

// FDC's search ranks single common-noun queries (e.g. "rice") toward snack
// products (rice cakes, rice crackers) over the plain ingredient. For these
// known staples, search with a more specific phrase instead.
const QUERY_EXPANSIONS: Record<string, string> = {
	rice: 'white rice cooked',
	'brown rice': 'brown rice cooked',
	chicken: 'chicken breast meat only cooked roasted',
	'chicken breast': 'chicken breast meat only cooked roasted',
	egg: 'egg whole hard boiled cooked',
	eggs: 'egg whole hard boiled cooked',
	bread: 'bread white',
	pasta: 'pasta cooked enriched',
	oats: 'oats cooked',
	oatmeal: 'oats cooked',
	potato: 'potato baked flesh and skin',
	'sweet potato': 'sweet potato baked',
	beef: 'beef ground cooked',
	'ground beef': 'beef ground cooked',
	milk: 'milk whole',
	butter: 'butter salted',
	broccoli: 'broccoli cooked boiled',
	salmon: 'salmon cooked',
	turkey: 'turkey breast meat only cooked roasted',
	yogurt: 'yogurt plain lowfat',
	'greek yogurt': 'yogurt greek plain lowfat'
};

export type ParsedLine = {
	grams: number;
	query: string;
	assumedGrams: boolean;
};

export type NutritionResult = {
	input: string;
	query: string;
	grams: number;
	assumedGrams: boolean;
	matchedFood?: string;
	calories?: number;
	protein?: number;
	carbs?: number;
	fat?: number;
	error?: string;
};

const OZ_TO_GRAMS = 28.3495;

export function parseLine(raw: string): ParsedLine | null {
	const line = raw.trim();
	if (!line) return null;

	let m = line.match(/^(\d+(?:\.\d+)?)\s*(g|grams?)\b\s*(?:of\s+)?(.+)$/i);
	if (m) return { grams: parseFloat(m[1]), query: m[3].trim(), assumedGrams: false };

	m = line.match(/^(\d+(?:\.\d+)?)\s*(oz|ounces?)\b\s*(?:of\s+)?(.+)$/i);
	if (m) return { grams: parseFloat(m[1]) * OZ_TO_GRAMS, query: m[3].trim(), assumedGrams: false };

	m = line.match(/^(\d+(?:\.\d+)?)\s+(.+)$/);
	if (m) return { grams: parseFloat(m[1]), query: m[2].trim(), assumedGrams: false };

	return { grams: 100, query: line, assumedGrams: true };
}

type FdcFood = {
	description: string;
	foodNutrients: { nutrientNumber: string; value: number }[];
};

const EXPANSION_KEYS = Object.keys(QUERY_EXPANSIONS).sort((a, b) => b.length - a.length);
const CHICKEN_TURKEY_GUARDS = ['skin', 'thigh', 'wing', 'leg', 'tender', 'nugget'];

function expandQuery(query: string): string {
	const q = query.toLowerCase();
	for (const key of EXPANSION_KEYS) {
		const re = new RegExp(`\\b${key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`);
		if (!re.test(q)) continue;
		if ((key === 'chicken' || key === 'chicken breast' || key === 'turkey') && CHICKEN_TURKEY_GUARDS.some((g) => q.includes(g))) {
			continue;
		}
		return QUERY_EXPANSIONS[key];
	}
	return query;
}

async function searchFood(query: string, apiKey: string): Promise<FdcFood[]> {
	const effectiveQuery = expandQuery(query);
	const url = new URL(FDC_SEARCH_URL);
	url.searchParams.set('query', effectiveQuery);
	url.searchParams.set('pageSize', '10');
	url.searchParams.set('dataType', 'Foundation,SR Legacy');
	url.searchParams.set('api_key', apiKey);

	const res = await fetch(url);
	if (!res.ok) {
		throw new Error(res.status === 429 ? 'Nutrition lookup rate-limited, try again shortly' : `Nutrition lookup failed (${res.status})`);
	}
	const data = await res.json();
	return data.foods ?? [];
}

function pickBestMatch(foods: FdcFood[], query: string): FdcFood | null {
	if (!foods.length) return null;
	const q = query.toLowerCase();

	let pool = foods.filter((f) => {
		const d = f.description.toLowerCase();
		return !BLACKLIST_WORDS.some((w) => d.includes(w) && !q.includes(w));
	});
	if (!pool.length) pool = foods;

	const wantsFlavor = FLAVOR_WORDS.some((w) => q.includes(w));
	if (!wantsFlavor) {
		const unflavored = pool.filter((f) => !FLAVOR_WORDS.some((w) => f.description.toLowerCase().includes(w)));
		if (unflavored.length) pool = unflavored;
	}

	return pool[0];
}

function extractPer100g(foodNutrients: FdcFood['foodNutrients']) {
	const find = (nutrientNumber: string) =>
		foodNutrients.find((n) => n.nutrientNumber === nutrientNumber)?.value ?? 0;
	return {
		calories: find('208'),
		protein: find('203'),
		carbs: find('205'),
		fat: find('204')
	};
}

export async function calculateLine(rawLine: string, apiKey: string): Promise<NutritionResult | null> {
	const parsed = parseLine(rawLine);
	if (!parsed) return null;

	try {
		const foods = await searchFood(parsed.query, apiKey);
		const best = pickBestMatch(foods, parsed.query);

		if (!best) {
			return {
				input: rawLine,
				query: parsed.query,
				grams: parsed.grams,
				assumedGrams: parsed.assumedGrams,
				error: 'No match found — try rephrasing'
			};
		}

		const per100 = extractPer100g(best.foodNutrients);
		const factor = parsed.grams / 100;

		return {
			input: rawLine,
			query: parsed.query,
			grams: parsed.grams,
			assumedGrams: parsed.assumedGrams,
			matchedFood: best.description,
			calories: Math.round(per100.calories * factor),
			protein: Math.round(per100.protein * factor * 10) / 10,
			carbs: Math.round(per100.carbs * factor * 10) / 10,
			fat: Math.round(per100.fat * factor * 10) / 10
		};
	} catch (e) {
		return {
			input: rawLine,
			query: parsed.query,
			grams: parsed.grams,
			assumedGrams: parsed.assumedGrams,
			error: e instanceof Error ? e.message : 'Lookup failed'
		};
	}
}
