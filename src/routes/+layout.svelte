<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class="bg-bg mx-auto flex min-h-dvh max-w-[480px] flex-col">
	{@render children()}
</div>
