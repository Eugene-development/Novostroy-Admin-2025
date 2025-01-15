/** @type {import('./$types').PageServerLoad} */
import { request } from 'graphql-request';
import { CATALOG, CATEGORY } from './query';
import { TEST } from './mutations';

export async function load({ params, url }) {
	const urlCRUD = import.meta.env.VITE_URL;
	const key = import.meta.env.VITE_KEY;

	const segments = url.pathname.split('/').filter((segment) => segment.length > 0);

	let isCategory;

	try {
		if (segments[3]) {
			const variables = {
				key,
				slug: segments[3]
			};
			const req = await request(urlCRUD, CATEGORY, variables);
			return {
				req,
				isCategory: true
			};
		} else {
			return;
		}
	} catch (error) {
		console.log(error);
	}
}

// 

/** @satisfies {import('./$types').Actions} */
export const actions = {
	ddd: async () => {
		console.log('ddd');
		return { success: true };
	}
};

