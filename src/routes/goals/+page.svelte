<script lang="ts">
	import BottomNav from '$lib/components/BottomNav.svelte';
	import ForkKnifeIcon from '$lib/components/icons/ForkKnifeIcon.svelte';
	import DropletIcon from '$lib/components/icons/DropletIcon.svelte';
	import BoltIcon from '$lib/components/icons/BoltIcon.svelte';
	import FlameIcon from '$lib/components/icons/FlameIcon.svelte';
	import PencilIcon from '$lib/components/icons/PencilIcon.svelte';
	import PlusIcon from '$lib/components/icons/PlusIcon.svelte';
	import { waterState, setWaterGoal } from '$lib/stores/water.svelte';

	const dailyTargets = $derived([
		{ label: 'Calories', value: '2,200 kcal / day', tint: 'bg-flame-tint', ink: 'text-flame', icon: ForkKnifeIcon },
		{ label: 'Water', value: `${waterState.goalOz} oz / day`, tint: 'bg-blue-tint', ink: 'text-blue', icon: DropletIcon },
		{ label: 'Activity', value: '45 active min / day', tint: 'bg-green-tint', ink: 'text-green', icon: BoltIcon }
	]);

	let editingWater = $state(false);
	let waterGoalInput = $state(String(waterState.goalOz));

	function saveWaterGoal() {
		const value = parseFloat(waterGoalInput);
		if (value > 0) setWaterGoal(value);
		editingWater = false;
	}

	let habits = $state([
		{ label: 'No fast food', status: 'Active · 3 day streak', on: true },
		{ label: 'No added sugar', status: 'Not started yet', on: false }
	]);

	function toggle(i: number) {
		habits[i].on = !habits[i].on;
	}
</script>

<div class="flex flex-1 flex-col gap-4.5 px-5 pt-5">
	<div>
		<div class="font-display text-[22px] font-bold">Your Goals</div>
		<div class="text-ink-soft text-[13px]">Set targets that fit your life.</div>
	</div>

	<div class="flex flex-col gap-2.5">
		<span class="text-ink-soft text-[13px] font-bold tracking-wide uppercase">Daily targets</span>
		{#each dailyTargets as target (target.label)}
			<div class="border-line bg-surface flex items-center gap-3.5 rounded-[20px] border px-4 py-3.5">
				<div class="{target.tint} {target.ink} flex h-10.5 w-10.5 shrink-0 items-center justify-center rounded-xl">
					<target.icon size={20} />
				</div>
				{#if target.label === 'Water' && editingWater}
					<div class="flex flex-grow items-center gap-2">
						<span class="text-[14px] font-bold">Water</span>
						<input
							type="number"
							inputmode="decimal"
							bind:value={waterGoalInput}
							class="border-line bg-bg text-ink w-20 rounded-lg border px-2 py-1 text-[13px] focus:outline-none"
						/>
						<span class="text-ink-faint text-xs">oz / day</span>
					</div>
					<button
						onclick={saveWaterGoal}
						class="bg-blue font-display flex h-8.5 shrink-0 items-center justify-center rounded-full px-3.5 text-[12px] font-bold text-white"
					>
						Save
					</button>
				{:else}
					<div class="flex flex-grow flex-col">
						<span class="text-[14px] font-bold">{target.label}</span>
						<span class="text-ink-faint text-xs">{target.value}</span>
					</div>
					<button
						onclick={() => {
							if (target.label === 'Water') {
								waterGoalInput = String(waterState.goalOz);
								editingWater = true;
							}
						}}
						class="bg-bg text-ink-soft flex h-8.5 w-8.5 shrink-0 items-center justify-center rounded-full"
					>
						<PencilIcon size={15} />
					</button>
				{/if}
			</div>
		{/each}
	</div>

	<div class="flex flex-col gap-2.5">
		<span class="text-ink-soft text-[13px] font-bold tracking-wide uppercase">Habit streaks</span>
		{#each habits as habit, i (habit.label)}
			<div class="border-line bg-surface flex items-center gap-3.5 rounded-[20px] border px-4 py-3.5">
				<div class="bg-purple-tint text-purple flex h-10.5 w-10.5 shrink-0 items-center justify-center rounded-xl">
					<FlameIcon size={20} />
				</div>
				<div class="flex flex-grow flex-col">
					<span class="text-[14px] font-bold">{habit.label}</span>
					<span class="text-ink-faint text-xs">{habit.status}</span>
				</div>
				<button
					class="box-border flex h-6.5 w-11 shrink-0 items-center rounded-full p-0.75 transition-colors"
					class:bg-purple={habit.on}
					class:bg-track={!habit.on}
					onclick={() => toggle(i)}
					aria-pressed={habit.on}
					aria-label="Toggle {habit.label} streak tracking"
				>
					<span
						class="h-5 w-5 rounded-full bg-white transition-transform"
						class:translate-x-4.5={habit.on}
					></span>
				</button>
			</div>
		{/each}

		<button
			class="border-line flex min-h-11 items-center justify-center gap-2 rounded-[20px] border-[1.5px] border-dashed p-3.5"
		>
			<span class="text-purple"><PlusIcon size={18} /></span>
			<span class="text-purple text-[14px] font-bold">New habit goal</span>
		</button>
	</div>

	<div class="flex-grow"></div>

	<BottomNav />
</div>
