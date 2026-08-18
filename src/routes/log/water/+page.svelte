<script lang="ts">
	import ChevronLeftIcon from '$lib/components/icons/ChevronLeftIcon.svelte';
	import DropletIcon from '$lib/components/icons/DropletIcon.svelte';
	import { waterState, addWater } from '$lib/stores/water.svelte';

	const bottles = [
		{ label: 'Owala bottle', oz: 32 },
		{ label: 'Yeti half gallon', oz: 64 }
	];

	let customAmount = $state('');

	const percent = $derived(Math.min(100, Math.round((waterState.ozToday / waterState.goalOz) * 100)));

	function addCustom() {
		const value = parseFloat(customAmount);
		if (!value || value <= 0) return;
		addWater(value);
		customAmount = '';
	}
</script>

<div class="flex flex-1 flex-col gap-5 px-5 pt-5">
	<div class="flex items-center gap-3.5">
		<a
			href="/log"
			class="border-line bg-surface flex h-9 w-9 shrink-0 items-center justify-center rounded-full border"
		>
			<ChevronLeftIcon size={18} />
		</a>
		<div class="font-display text-[20px] font-bold">Log Water</div>
	</div>

	<div class="bg-blue-tint flex flex-col gap-3 rounded-3xl px-5 py-4.5">
		<div class="flex items-center gap-4">
			<div class="bg-surface flex h-14 w-14 shrink-0 items-center justify-center rounded-full">
				<span class="text-blue"><DropletIcon size={28} /></span>
			</div>
			<div>
				<div class="flex items-baseline gap-1.5">
					<span class="font-display text-blue-ink text-[32px] leading-none font-extrabold"
						>{waterState.ozToday}</span
					>
					<span class="text-blue-ink text-sm font-semibold">/ {waterState.goalOz} oz today</span>
				</div>
				<div class="text-blue-ink text-[13px] opacity-85">
					{percent >= 100 ? "Goal hit — nice hydration!" : `${percent}% of today's goal`}
				</div>
			</div>
		</div>
		<div class="bg-surface h-3 w-full overflow-hidden rounded-full">
			<div class="bg-blue h-full rounded-full transition-all" style="width: {percent}%"></div>
		</div>
	</div>

	<div class="flex flex-col gap-2.5">
		<span class="text-ink-soft text-[13px] font-bold">Quick repeat</span>
		<div class="flex flex-col gap-2.5">
			{#each bottles as bottle (bottle.label)}
				<button
					onclick={() => addWater(bottle.oz)}
					class="border-line bg-surface flex min-h-[60px] items-center gap-3.5 rounded-2xl border px-4 py-3.5 text-left"
				>
					<div class="bg-blue-tint text-blue flex h-10.5 w-10.5 shrink-0 items-center justify-center rounded-xl">
						<DropletIcon size={20} />
					</div>
					<div class="flex flex-grow flex-col">
						<span class="text-[14px] font-bold">{bottle.label}</span>
						<span class="text-ink-faint text-xs">{bottle.oz} oz</span>
					</div>
					<span class="text-blue font-display text-[15px] font-bold">+{bottle.oz} oz</span>
				</button>
			{/each}
		</div>
	</div>

	<div class="flex flex-col gap-2.5">
		<span class="text-ink-soft text-[13px] font-bold">Custom amount</span>
		<div class="flex gap-2.5">
			<input
				type="number"
				inputmode="decimal"
				bind:value={customAmount}
				placeholder="oz"
				class="border-line bg-surface text-ink placeholder:text-ink-faint min-h-11 flex-grow rounded-2xl border px-4 text-[14px] focus:outline-none"
			/>
			<button
				onclick={addCustom}
				class="bg-blue font-display min-h-11 shrink-0 rounded-2xl px-6 text-[14px] font-bold text-white"
			>
				Add
			</button>
		</div>
	</div>

	<div class="flex-grow"></div>
</div>
