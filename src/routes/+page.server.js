/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch }) {
	// fetch data from surfline
	const data = await fetch(
		'https://services.surfline.com/kbyg/regions/forecasts/conditions?subregionId=58581a836630e24c44878fcb&days=5'
	).then((e) => e.json());

	console.log(data.data);
	return { data: data.data };
}
