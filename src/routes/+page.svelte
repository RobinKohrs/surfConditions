<script>
	import Map from '$lib/Map.svelte';

	const { data } = $props();

	let map = $state();
	let bind = $state();
	$inspect(map);

</script>

<Map bind:map  />
