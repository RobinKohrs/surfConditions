<script>
	import { PUBLIC_MAPTILER_KEY } from '$env/static/public';
	import 'maplibre-gl/dist/maplibre-gl.css';

	let { map = $bindable() } = $props();
	let mapContainer;
	$effect(() => {
		(async () => {
			const initialState = { lng: -8.9, lat: 37.02, zoom: 8 };
			const maplibregl = await import('maplibre-gl');

			map = new maplibregl.Map({
				container: mapContainer,
				style: `https://api.maptiler.com/maps/aquarelle/style.json?key=${PUBLIC_MAPTILER_KEY}`,
				center: [initialState.lng, initialState.lat],
				zoom: initialState.zoom
			});
		})();
		map.on('load', () => {
			map.addSource('surfSpots', {
				type: 'vector',
				url: 'https://api.maptiler.com/tiles/40f7fb84-7513-4af3-9a9e-4e69edffa95d/tiles.json?key=YED34JdAn8w32PnMgk9m',
				minzoom: 0,
				maxzoom: 18
			});
			map.addLayer({
				id: 'surf-spots',
				type: 'circle',
				source: 'surfSpots',
				'source-layer': 'all_spots',
				paint: {
					'circle-radius': 6, // Size of the points
					'circle-color': '#007cbf', // Color of the points
					'circle-stroke-width': 1,
					'circle-stroke-color': '#ffffff'
				}
			});
		});
	});
</script>

<div class="map-wrap">
	<a href="https://www.maptiler.com" class="watermark"
		><img src="https://api.maptiler.com/resources/logo.svg" alt="MapTiler logo" /></a
	>
	<div class="map" bind:this={mapContainer}></div>
</div>

<style>
	.map-wrap {
		position: relative;
		width: 100%;
		min-height: 100vh;
	}

	.map {
		position: absolute;
		width: 100%;
		height: 100%;
	}

	.watermark {
		position: absolute;
		left: 10px;
		bottom: 10px;
		z-index: 999;
	}
</style>
