<script lang="ts">
	let { size = 20, filled = false }: { size?: number; filled?: boolean } = $props();
</script>

<svg
	width={size}
	height={size}
	viewBox="0 0 24 24"
	fill={filled ? 'currentColor' : 'none'}
	stroke="currentColor"
	stroke-width={filled ? 1 : 2}
	stroke-linecap="round"
	stroke-linejoin="round"
>
	<path
		d="M12 2c1 3-3 4-3 8a3 3 0 0 0 6 0c0-1-1-2-1-3 2 1 3 3 3 6a5 5 0 0 1-10 0c0-5 3-6 5-11z"
	/>
</svg>
