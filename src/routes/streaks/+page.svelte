<script lang="ts">
	import BottomNav from '$lib/components/BottomNav.svelte';
	import FlameIcon from '$lib/components/icons/FlameIcon.svelte';
	import ShieldIcon from '$lib/components/icons/ShieldIcon.svelte';
	import PlusIcon from '$lib/components/icons/PlusIcon.svelte';

	type Streak = {
		title: string;
		days: number;
		percent: number;
		note: string;
		dim?: boolean;
	};

	const streaks: Streak[] = [
		{ title: 'Logged food every day', days: 12, percent: 80, note: '3 days to your 15-day badge' },
		{ title: 'Hit water goal', days: 5, percent: 33, note: '2 days to your 7-day badge' },
		{ title: 'No fast food', days: 3, percent: 43, note: '4 days to your 7-day badge' },
		{
			title: '30 min activity',
			days: 1,
			percent: 14,
			note: 'Just started — nice work today',
			dim: true
		}
	];
</script>

<div class="flex flex-1 flex-col gap-4.5 px-5 pt-5">
	<div class="flex items-start justify-between">
		<div>
			<div class="font-display text-[22px] font-bold">Your Streaks</div>
			<div class="text-ink-soft text-[13px]">Small habits, big changes.</div>
		</div>
		<div class="bg-blue-tint flex items-center gap-1.5 rounded-full px-3 py-2">
			<span class="text-blue"><ShieldIcon size={16} /></span>
			<span class="font-display text-blue text-[13px] font-bold">2 shields</span>
		</div>
	</div>

	<div class="flex flex-col gap-3">
		{#each streaks as streak (streak.title)}
			<div
				class="border-line bg-surface flex items-center gap-3.5 rounded-[20px] border p-4"
				class:opacity-75={streak.dim}
			>
				<div
					class="flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px]"
					class:bg-flame-tint={!streak.dim}
					class:bg-bg={streak.dim}
				>
					<span class:text-flame={!streak.dim} class:text-flame-dim={streak.dim}>
						<FlameIcon size={24} filled />
					</span>
				</div>
				<div class="flex flex-grow flex-col gap-1.5">
					<div class="flex items-center justify-between">
						<span class="text-[14px] font-bold">{streak.title}</span>
						<span
							class="font-display text-[16px] font-extrabold"
							class:text-flame-ink={!streak.dim}
							class:text-ink-soft={streak.dim}>{streak.days}</span
						>
					</div>
					<div class="bg-track h-1.5 w-full overflow-hidden rounded-full">
						<div
							class="h-full"
							class:bg-flame={!streak.dim}
							class:bg-flame-dim={streak.dim}
							style="width: {streak.percent}%"
						></div>
					</div>
					<span class="text-ink-faint text-[11px]">{streak.note}</span>
				</div>
			</div>
		{/each}

		<button
			class="border-line flex min-h-11 items-center justify-center gap-2 rounded-[20px] border-[1.5px] border-dashed p-4"
		>
			<span class="text-purple"><PlusIcon size={18} /></span>
			<span class="text-purple text-[14px] font-bold">Start a new streak</span>
		</button>
	</div>

	<div class="flex-grow"></div>

	<BottomNav />
</div>
