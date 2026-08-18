<script lang="ts">
	let { size = 20 }: { size?: number } = $props();
</script>

<svg
	width={size}
	height={size}
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	stroke-width="2"
	stroke-linecap="round"
	stroke-linejoin="round"
>
	<path d="M7 3v6a2 2 0 0 0 2 2v10" />
	<path d="M7 3v4" />
	<path d="M10 3v4" />
	<path d="M17 3c-1.7 0-3 1.6-3 4v3.5h3V21" />
</svg>
