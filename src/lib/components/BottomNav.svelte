<script lang="ts">
	import { page } from '$app/state';
	import HomeIcon from './icons/HomeIcon.svelte';
	import FlameIcon from './icons/FlameIcon.svelte';
	import TargetIcon from './icons/TargetIcon.svelte';
	import PlusIcon from './icons/PlusIcon.svelte';

	const path = $derived(page.url.pathname);
</script>

<nav
	class="border-line bg-surface sticky bottom-0 -mx-5 flex items-end justify-between border-t px-2 pt-2.5 pb-6"
>
	<a href="/" class="flex flex-1 flex-col items-center gap-0.5" aria-current={path === '/'}>
		<span class={path === '/' ? 'text-purple' : 'text-ink-faint'}>
			<HomeIcon size={22} />
		</span>
		<span class="text-[11px] font-semibold {path === '/' ? 'text-purple' : 'text-ink-faint'}"
			>Home</span
		>
	</a>

	<a
		href="/streaks"
		class="flex flex-1 flex-col items-center gap-0.5"
		aria-current={path === '/streaks'}
	>
		<span class={path === '/streaks' ? 'text-flame' : 'text-ink-faint'}>
			<FlameIcon size={22} filled={path === '/streaks'} />
		</span>
		<span class="text-[11px] font-semibold {path === '/streaks' ? 'text-flame' : 'text-ink-faint'}"
			>Streaks</span
		>
	</a>

	<a href="/log" class="flex flex-1 flex-col items-center">
		<span
			class="bg-flame shadow-flame/40 -mt-7 flex h-13 w-13 items-center justify-center rounded-full shadow-lg"
		>
			<PlusIcon size={24} color="white" />
		</span>
		<span
			class="mt-0.5 text-[11px] font-semibold {path.startsWith('/log') ? 'text-flame' : 'text-ink-faint'}"
			>Log</span
		>
	</a>

	<a
		href="/goals"
		class="flex flex-1 flex-col items-center gap-0.5"
		aria-current={path === '/goals'}
	>
		<span class={path === '/goals' ? 'text-purple' : 'text-ink-faint'}>
			<TargetIcon size={22} filled={path === '/goals'} />
		</span>
		<span class="text-[11px] font-semibold {path === '/goals' ? 'text-purple' : 'text-ink-faint'}"
			>Goals</span
		>
	</a>

	<a href="/profile" class="flex flex-1 flex-col items-center gap-0.5">
		<span class="bg-purple-tint flex h-5.5 w-5.5 items-center justify-center rounded-full">
			<span class="text-purple text-[9px] font-extrabold">JP</span>
		</span>
		<span class="text-ink-faint text-[11px] font-semibold">Profile</span>
	</a>
</nav>
