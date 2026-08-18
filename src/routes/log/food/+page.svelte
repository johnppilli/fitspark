<script lang="ts">
	import ChevronLeftIcon from '$lib/components/icons/ChevronLeftIcon.svelte';
	import ForkKnifeIcon from '$lib/components/icons/ForkKnifeIcon.svelte';
	import CheckCircleIcon from '$lib/components/icons/CheckCircleIcon.svelte';
	import { addNutrition } from '$lib/stores/nutrition.svelte';

	type NutritionResult = {
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

	let inputText = $state('');
	let results = $state<NutritionResult[]>([]);
	let loading = $state(false);
	let errorMsg = $state('');
	let hasCalculated = $state(false);
	let justAdded = $state(false);

	const totals = $derived(
		results.reduce(
			(acc, r) => {
				if (r.error) return acc;
				acc.calories += r.calories ?? 0;
				acc.protein += r.protein ?? 0;
				acc.carbs += r.carbs ?? 0;
				acc.fat += r.fat ?? 0;
				return acc;
			},
			{ calories: 0, protein: 0, carbs: 0, fat: 0 }
		)
	);

	async function calculate() {
		const lines = inputText
			.split('\n')
			.map((l) => l.trim())
			.filter(Boolean);
		if (!lines.length) return;

		loading = true;
		errorMsg = '';
		try {
			const res = await fetch('/api/nutrition', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ lines })
			});
			if (!res.ok) throw new Error('Request failed');
			const data = await res.json();
			results = data.results;
			hasCalculated = true;
			justAdded = false;
		} catch {
			errorMsg = "Couldn't calculate nutrition — check your connection and try again.";
		} finally {
			loading = false;
		}
	}

	function addToLog() {
		if (!totals.calories && !totals.protein && !totals.carbs && !totals.fat) return;
		addNutrition(totals);
		justAdded = true;
		inputText = '';
		results = [];
		hasCalculated = false;
	}
</script>

<div class="flex flex-1 flex-col gap-5 px-5 pt-5 pb-8">
	<div class="flex items-center gap-3.5">
		<a
			href="/log"
			class="border-line bg-surface flex h-9 w-9 shrink-0 items-center justify-center rounded-full border"
		>
			<ChevronLeftIcon size={18} />
		</a>
		<div class="font-display text-[20px] font-bold">Log Food</div>
	</div>

	<div class="flex flex-col gap-2.5">
		<span class="text-ink-soft text-[13px] font-semibold"
			>One food per line — grams work best</span
		>
		<textarea
			bind:value={inputText}
			rows="5"
			placeholder={'200g cooked chicken breast\n100g rice\n250g greek yogurt'}
			class="border-line bg-surface text-ink placeholder:text-ink-faint w-full resize-none rounded-2xl border p-4 text-[14px] leading-relaxed focus:outline-none"
		></textarea>
		<button
			onclick={calculate}
			disabled={loading || !inputText.trim()}
			class="bg-flame font-display flex min-h-11 items-center justify-center rounded-2xl py-3 text-[15px] font-bold text-white disabled:opacity-50"
		>
			{loading ? 'Calculating…' : 'Calculate'}
		</button>
		{#if errorMsg}
			<span class="text-flame-ink text-[13px] font-medium">{errorMsg}</span>
		{/if}
	</div>

	{#if hasCalculated}
		<div class="flex flex-col gap-2.5">
			{#each results as r (r.input)}
				<div class="border-line bg-surface flex items-center gap-3.5 rounded-[20px] border p-4">
					<div
						class="bg-flame-tint text-flame flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px]"
					>
						<ForkKnifeIcon size={20} />
					</div>
					<div class="flex flex-grow flex-col gap-0.5">
						{#if r.error}
							<span class="text-[14px] font-bold">{r.input}</span>
							<span class="text-flame-ink text-xs">{r.error}</span>
						{:else}
							<span class="text-[14px] font-bold">{r.matchedFood}</span>
							<span class="text-ink-faint text-xs">
								{r.grams}g{r.assumedGrams ? ' (assumed)' : ''} · {r.protein}g protein · {r.carbs}g carbs
								· {r.fat}g fat
							</span>
						{/if}
					</div>
					{#if !r.error}
						<span class="font-display text-[16px] font-extrabold">{r.calories}</span>
					{/if}
				</div>
			{/each}
		</div>

		<div class="bg-flame-tint flex flex-col gap-3 rounded-3xl px-5 py-4.5">
			<div class="flex items-baseline justify-between">
				<span class="text-flame-ink text-[13px] font-bold">Total</span>
				<div class="flex items-baseline gap-1.5">
					<span class="font-display text-flame-ink text-[30px] leading-none font-extrabold"
						>{totals.calories}</span
					>
					<span class="text-flame-ink text-[13px] font-semibold">kcal</span>
				</div>
			</div>
			<div class="flex justify-between text-[13px] font-semibold">
				<span class="text-flame-ink">{Math.round(totals.protein * 10) / 10}g protein</span>
				<span class="text-flame-ink">{Math.round(totals.carbs * 10) / 10}g carbs</span>
				<span class="text-flame-ink">{Math.round(totals.fat * 10) / 10}g fat</span>
			</div>
		</div>

		<button
			onclick={addToLog}
			class="bg-surface border-flame font-display text-flame flex min-h-11 items-center justify-center rounded-2xl border-2 py-3 text-[15px] font-bold"
		>
			Add to today's log
		</button>
	{/if}

	{#if justAdded}
		<div class="bg-green-tint flex items-center gap-3 rounded-2xl px-4 py-3.5">
			<span class="text-green-ink shrink-0"><CheckCircleIcon size={22} /></span>
			<div class="text-green-ink text-[13px] leading-snug font-medium">
				Added to today's log — check the Home dashboard.
			</div>
		</div>
	{/if}
</div>
