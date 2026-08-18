<script lang="ts">
	let { size = 20, color = 'currentColor' }: { size?: number; color?: string } = $props();
</script>

<svg
	width={size}
	height={size}
	viewBox="0 0 24 24"
	fill="none"
	stroke={color}
	stroke-width="2.4"
	stroke-linecap="round"
>
	<path d="M12 5v14M5 12h14" />
</svg>
