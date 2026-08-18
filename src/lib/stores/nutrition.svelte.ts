import { browser } from '$app/environment';

const STORAGE_KEY = 'fitspark:nutrition';
const DEFAULT_GOAL_CALORIES = 2200;

function todayKey() {
	const d = new Date();
	return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

type Totals = { calories: number; protein: number; carbs: number; fat: number };

const ZERO_TOTALS: Totals = { calories: 0, protein: 0, carbs: 0, fat: 0 };

function loadStored() {
	if (!browser) return { ...ZERO_TOTALS, goalCalories: DEFAULT_GOAL_CALORIES };
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return { ...ZERO_TOTALS, goalCalories: DEFAULT_GOAL_CALORIES };
		const data = JSON.parse(raw);
		const goalCalories = typeof data.goalCalories === 'number' ? data.goalCalories : DEFAULT_GOAL_CALORIES;
		if (data.date !== todayKey()) return { ...ZERO_TOTALS, goalCalories };
		return {
			calories: data.calories ?? 0,
			protein: data.protein ?? 0,
			carbs: data.carbs ?? 0,
			fat: data.fat ?? 0,
			goalCalories
		};
	} catch {
		return { ...ZERO_TOTALS, goalCalories: DEFAULT_GOAL_CALORIES };
	}
}

const initial = loadStored();

export const nutritionState = $state({
	calories: initial.calories,
	protein: initial.protein,
	carbs: initial.carbs,
	fat: initial.fat,
	goalCalories: initial.goalCalories
});

function persist() {
	if (!browser) return;
	localStorage.setItem(
		STORAGE_KEY,
		JSON.stringify({
			date: todayKey(),
			calories: nutritionState.calories,
			protein: nutritionState.protein,
			carbs: nutritionState.carbs,
			fat: nutritionState.fat,
			goalCalories: nutritionState.goalCalories
		})
	);
}

export function addNutrition(totals: Totals) {
	nutritionState.calories = Math.max(0, Math.round(nutritionState.calories + totals.calories));
	nutritionState.protein = Math.max(0, Math.round((nutritionState.protein + totals.protein) * 10) / 10);
	nutritionState.carbs = Math.max(0, Math.round((nutritionState.carbs + totals.carbs) * 10) / 10);
	nutritionState.fat = Math.max(0, Math.round((nutritionState.fat + totals.fat) * 10) / 10);
	persist();
}

export function setCalorieGoal(calories: number) {
	nutritionState.goalCalories = Math.max(1, Math.round(calories));
	persist();
}

export function resetNutritionToday() {
	nutritionState.calories = 0;
	nutritionState.protein = 0;
	nutritionState.carbs = 0;
	nutritionState.fat = 0;
	persist();
}
