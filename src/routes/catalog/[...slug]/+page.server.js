/** @type {import('./$types').PageServerLoad} */
import { request } from 'graphql-request';
import { CATALOG, CATEGORY } from './query';

export async function load({ params, url }) {
	const urlCRUD = import.meta.env.VITE_URL;
	const key = import.meta.env.VITE_KEY;

	const segments = url.pathname.split('/').filter((segment) => segment.length > 0);

	let isCategory;
	try {
		const variables = {
			key,
			slug: segments[3]
		};
		const req = await request(urlCRUD, CATEGORY, variables);
		return {
			req,
			isCategory: true
		};
	} catch (error) {
		console.log(error);
	}
}
