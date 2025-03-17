/** @type {import('./$types').PageServerLoad} */
import { request } from 'graphql-request';
import { FULLCATEGORY, FULLCATALOG, ALL_TAGS } from '$lib/graphql/queries/catalog/index.js';

export async function load({ params, url }) {
	const urlCRUD = import.meta.env.VITE_URL_CRUD;
	const key = import.meta.env.VITE_KEY;

	try {
		const variables = {
			key
		};
		const req = await request(urlCRUD, FULLCATALOG, variables);
		const dataCategory = await request(urlCRUD, FULLCATEGORY, variables);
		const dataTags = await request(urlCRUD, ALL_TAGS, variables);

		// Sort fullcategory array alphabetically by value property
		dataCategory?.fullcategory?.sort((a, b) => a.value.localeCompare(b.value));

		return {
			req,
			dataCategory,
			dataTags
		};
	} catch (error) {
		console.log(error);
	}
}
