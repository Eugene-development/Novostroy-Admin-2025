/** @type {import('./$types').PageServerLoad} */
import { request } from 'graphql-request';
import {FULLCATEGORY, FULLCATALOG } from '$lib/graphql/queries/catalog/index.js';

export async function load({ params, url }) {
	const urlCRUD = import.meta.env.VITE_URL;
	const key = import.meta.env.VITE_KEY;

	try {
		const variables = {
			key
		};
		const req = await request(urlCRUD, FULLCATALOG, variables);
		const dataCategory = await request(urlCRUD, FULLCATEGORY, variables);

		return {
			req,
			dataCategory
		};
	} catch (error) {
		console.log(error);
	}
}
