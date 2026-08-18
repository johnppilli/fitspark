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
	<rect x="2" y="9" width="3" height="6" rx="1" />
	<rect x="19" y="9" width="3" height="6" rx="1" />
	<rect x="6" y="7" width="2" height="10" rx="1" />
	<rect x="16" y="7" width="2" height="10" rx="1" />
	<line x1="8" y1="12" x2="16" y2="12" />
</svg>
