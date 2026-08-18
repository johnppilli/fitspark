<script lang="ts">
	let { size = 20, filled = false }: { size?: number; filled?: boolean } = $props();
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
	<circle cx="12" cy="12" r="9" />
	<circle cx="12" cy="12" r="5" />
	<circle cx="12" cy="12" r="1.4" fill={filled ? 'currentColor' : 'none'} stroke="none" />
</svg>
