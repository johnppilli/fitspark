<script lang="ts">
	import ChevronLeftIcon from '$lib/components/icons/ChevronLeftIcon.svelte';
	import BoltIcon from '$lib/components/icons/BoltIcon.svelte';
	import { activityState, addActivity } from '$lib/stores/activity.svelte';

	const quickAdds = [
		{ label: 'Walk', minutes: 15 },
		{ label: 'Run', minutes: 30 },
		{ label: 'Gym session', minutes: 45 },
		{ label: 'Bike ride', minutes: 20 }
	];

	let customAmount = $state('');

	const percent = $derived(
		Math.min(100, Math.round((activityState.minutesToday / activityState.goalMinutes) * 100))
	);

	function addCustom() {
		const value = parseFloat(customAmount);
		if (!value || value <= 0) return;
		addActivity(value);
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
		<div class="font-display text-[20px] font-bold">Log Activity</div>
	</div>

	<div class="bg-green-tint flex flex-col gap-3 rounded-3xl px-5 py-4.5">
		<div class="flex items-center gap-4">
			<div class="bg-surface flex h-14 w-14 shrink-0 items-center justify-center rounded-full">
				<span class="text-green"><BoltIcon size={28} /></span>
			</div>
			<div>
				<div class="flex items-baseline gap-1.5">
					<span class="font-display text-green-ink text-[32px] leading-none font-extrabold"
						>{activityState.minutesToday}</span
					>
					<span class="text-green-ink text-sm font-semibold">/ {activityState.goalMinutes} min today</span
					>
				</div>
				<div class="text-green-ink text-[13px] opacity-85">
					{percent >= 100 ? 'Goal hit — great work!' : `${percent}% of today's goal`}
				</div>
			</div>
		</div>
		<div class="bg-surface h-3 w-full overflow-hidden rounded-full">
			<div class="bg-green h-full rounded-full transition-all" style="width: {percent}%"></div>
		</div>
	</div>

	<div class="flex flex-col gap-2.5">
		<span class="text-ink-soft text-[13px] font-bold">Quick repeat</span>
		<div class="grid grid-cols-2 gap-2.5">
			{#each quickAdds as item (item.label)}
				<button
					onclick={() => addActivity(item.minutes)}
					class="border-line bg-surface flex min-h-[60px] flex-col items-start justify-center gap-0.5 rounded-2xl border px-4 py-3"
				>
					<span class="text-[14px] font-bold">{item.label}</span>
					<span class="text-green font-display text-[13px] font-bold">+{item.minutes} min</span>
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
				placeholder="minutes"
				class="border-line bg-surface text-ink placeholder:text-ink-faint min-h-11 flex-grow rounded-2xl border px-4 text-[14px] focus:outline-none"
			/>
			<button
				onclick={addCustom}
				class="bg-green font-display min-h-11 shrink-0 rounded-2xl px-6 text-[14px] font-bold text-white"
			>
				Add
			</button>
		</div>
	</div>

	<div class="flex-grow"></div>
</div>
