<script lang="ts">
	import BottomNav from '$lib/components/BottomNav.svelte';
	import FlameIcon from '$lib/components/icons/FlameIcon.svelte';
	import ForkKnifeIcon from '$lib/components/icons/ForkKnifeIcon.svelte';
	import DropletIcon from '$lib/components/icons/DropletIcon.svelte';
	import BoltIcon from '$lib/components/icons/BoltIcon.svelte';
	import CheckCircleIcon from '$lib/components/icons/CheckCircleIcon.svelte';
</script>

<div class="flex flex-1 flex-col gap-5 px-5 pt-5">
	<div class="flex items-center justify-between">
		<div>
			<div class="font-display text-[22px] font-bold">Good morning, John</div>
			<div class="text-ink-soft text-[13px]">Tuesday, Aug 18</div>
		</div>
		<div class="bg-purple-tint flex items-center gap-1.5 rounded-full py-2 pr-3.5 pl-2.5">
			<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-purple)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<path d="M12 2l2.6 5.9 6.4.6-4.8 4.3 1.4 6.3L12 15.9 6.4 19.1l1.4-6.3L3 8.5l6.4-.6L12 2z" />
			</svg>
			<span class="font-display text-purple text-[15px] font-bold">Lv 7</span>
		</div>
	</div>

	<div class="bg-flame-tint flex items-center gap-4 rounded-3xl px-5 py-4.5">
		<div class="bg-surface text-flame flex h-14 w-14 shrink-0 items-center justify-center rounded-full">
			<FlameIcon size={30} filled />
		</div>
		<div>
			<div class="flex items-baseline gap-1.5">
				<span class="font-display text-flame-ink text-[32px] leading-none font-extrabold">12</span>
				<span class="text-flame-ink text-sm font-semibold">day streak</span>
			</div>
			<div class="text-flame-ink text-[13px] opacity-85">You're on fire — keep it going!</div>
		</div>
	</div>

	<div class="flex flex-col gap-1.5">
		<div class="flex items-baseline justify-between">
			<span class="text-ink-soft text-[13px] font-semibold">Level 7 progress</span>
			<span class="text-purple text-[13px] font-semibold">245 / 400 XP</span>
		</div>
		<div class="bg-track h-3 w-full overflow-hidden rounded-full">
			<div class="bg-purple h-full rounded-full" style="width: 61%"></div>
		</div>
	</div>

	<div class="grid grid-cols-3 gap-3">
		<div class="border-line bg-surface flex flex-col gap-2 rounded-2xl border p-3">
			<div class="bg-flame-tint text-flame flex h-8 w-8 items-center justify-center rounded-[10px]">
				<ForkKnifeIcon size={17} />
			</div>
			<div>
				<div class="font-display text-lg font-bold">1,450</div>
				<div class="text-ink-faint text-[11px]">/ 2,200 kcal</div>
			</div>
			<div class="bg-track h-1.5 w-full overflow-hidden rounded-full">
				<div class="bg-flame h-full" style="width: 66%"></div>
			</div>
		</div>

		<div class="border-line bg-surface flex flex-col gap-2 rounded-2xl border p-3">
			<div class="bg-blue-tint text-blue flex h-8 w-8 items-center justify-center rounded-[10px]">
				<DropletIcon size={17} />
			</div>
			<div>
				<div class="font-display text-lg font-bold">5</div>
				<div class="text-ink-faint text-[11px]">/ 8 cups</div>
			</div>
			<div class="bg-track h-1.5 w-full overflow-hidden rounded-full">
				<div class="bg-blue h-full" style="width: 62%"></div>
			</div>
		</div>

		<div class="border-line bg-surface flex flex-col gap-2 rounded-2xl border p-3">
			<div class="bg-green-tint text-green flex h-8 w-8 items-center justify-center rounded-[10px]">
				<BoltIcon size={17} />
			</div>
			<div>
				<div class="font-display text-lg font-bold">32</div>
				<div class="text-ink-faint text-[11px]">/ 45 min</div>
			</div>
			<div class="bg-track h-1.5 w-full overflow-hidden rounded-full">
				<div class="bg-green h-full" style="width: 71%"></div>
			</div>
		</div>
	</div>

	<div class="bg-green-tint flex items-center gap-3 rounded-2xl px-4 py-3.5">
		<span class="text-green-ink shrink-0"><CheckCircleIcon size={22} /></span>
		<div class="text-green-ink text-[13px] leading-snug font-medium">
			Nice! You've hit your water goal 5 days running.
		</div>
	</div>

	<div class="flex-grow"></div>

	<BottomNav />
</div>
