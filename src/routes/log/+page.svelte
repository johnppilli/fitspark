<script lang="ts">
	import BottomNav from '$lib/components/BottomNav.svelte';
	import ChevronLeftIcon from '$lib/components/icons/ChevronLeftIcon.svelte';
	import ForkKnifeIcon from '$lib/components/icons/ForkKnifeIcon.svelte';
	import DropletIcon from '$lib/components/icons/DropletIcon.svelte';
	import BoltIcon from '$lib/components/icons/BoltIcon.svelte';
	import DumbbellIcon from '$lib/components/icons/DumbbellIcon.svelte';
	import { addWater } from '$lib/stores/water.svelte';

	const categories = [
		{ label: 'Log Food', tint: 'bg-flame-tint', ink: 'text-flame-ink', icon: ForkKnifeIcon, href: '/log/food' },
		{ label: 'Log Water', tint: 'bg-blue-tint', ink: 'text-blue-ink', icon: DropletIcon, href: '/log/water' },
		{ label: 'Log Activity', tint: 'bg-green-tint', ink: 'text-green-ink', icon: BoltIcon, href: '/log/activity' },
		{ label: 'Log Custom', tint: 'bg-purple-tint', ink: 'text-purple', icon: DumbbellIcon, href: null }
	];

	const waterQuickAdds = [
		{ label: 'Owala +32 oz', oz: 32 },
		{ label: 'Yeti +64 oz', oz: 64 }
	];
</script>

<div class="flex flex-1 flex-col gap-5 px-5 pt-5">
	<div class="flex items-center gap-3.5">
		<a
			href="/"
			class="border-line bg-surface flex h-9 w-9 shrink-0 items-center justify-center rounded-full border"
		>
			<ChevronLeftIcon size={18} />
		</a>
		<div class="font-display text-[20px] font-bold">Log Something</div>
	</div>

	<div class="grid grid-cols-2 gap-3.5">
		{#each categories as cat (cat.label)}
			<svelte:element
				this={cat.href ? 'a' : 'button'}
				href={cat.href}
				disabled={cat.href ? undefined : true}
				class="{cat.tint} flex min-h-[130px] flex-col items-center justify-center gap-2.5 rounded-[22px] px-3 py-6 {cat.href
					? ''
					: 'opacity-60'}"
			>
				<span class={cat.ink}>
					<cat.icon size={30} />
				</span>
				<span class="font-display {cat.ink} text-[15px] font-bold">{cat.label}</span>
				{#if !cat.href}
					<span class="text-ink-faint text-[11px] font-semibold">Coming soon</span>
				{/if}
			</svelte:element>
		{/each}
	</div>

	<div class="flex flex-col gap-2.5">
		<span class="text-ink-soft text-[13px] font-bold">Quick repeat</span>
		<div class="flex flex-wrap gap-2">
			{#each waterQuickAdds as item (item.label)}
				<button
					onclick={() => addWater(item.oz)}
					class="border-line bg-surface flex min-h-11 items-center gap-1.5 rounded-full border px-3.5 py-2.5"
				>
					<span class="text-blue"><DropletIcon size={14} /></span>
					<span class="text-[13px] font-semibold">{item.label}</span>
				</button>
			{/each}
		</div>
	</div>

	<div class="flex-grow"></div>

	<BottomNav />
</div>
