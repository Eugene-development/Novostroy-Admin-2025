/** @type {import('./$types').PageServerLoad} */
import { request, gql, GraphQLClient } from 'graphql-request';
import { CATEGORY } from '$lib/graphql/queries/catalog/index.js';
import { CREATE_PRODUCT } from '$lib/graphql/mutations/catalog/index.js';
import { createSlug } from '$lib/utils/slug.js';

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

/** @satisfies {import('./$types').Actions} */

const urlCRUD = import.meta.env.VITE_URL;
const key = import.meta.env.VITE_KEY;

const graphQLClient = new GraphQLClient(urlCRUD, {
	headers: {
		Authorization: `Bearer ${key}`
	}
});

export const actions = {
	addProduct: async ({ request }) => {
		try {
			const uuid = crypto.randomUUID();
			const data = await request.formData();

			const variables = {
				id: uuid,
				key,
				value: data.get('value'),
				slug: createSlug(data.get('value')),
				parentable_type: 'category',
				parentable_id: data.get('category_uuid'),
				images: JSON.parse(data.get('currentImages'))  // currentImages

			};

			console.log(variables);

			const result = await graphQLClient.request(CREATE_PRODUCT, variables);

			return { success: true, data: result };
		} catch (error) {
			console.error('Error creating product:', error);
			return { success: false, error: error.message };
		}
	}
};
