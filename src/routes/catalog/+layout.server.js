/** @type {import('./$types').PageServerLoad} */
import { request } from 'graphql-request';
import { FULLCATALOG } from './query';

export async function load({ params, url }) {
	const urlCRUD = import.meta.env.VITE_URL;
	const key = import.meta.env.VITE_KEY;

	try {
		const variables = {
			key
		};
		const req = await request(urlCRUD, FULLCATALOG, variables);
		return {
			req
		};
	} catch (error) {
		console.log(error);
	}
	
}
