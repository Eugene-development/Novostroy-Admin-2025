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

		return {
			req,
			dataCategory,
			dataTags
		};
	} catch (error) {
		console.log(error);
	}
}
