/** @satisfies {import('./$types').Actions} */
import { request, gql, GraphQLClient } from 'graphql-request';
import { CREATE_PRODUCT } from '$lib/graphql/mutations/catalog/index.js';
import { createSlug } from '$lib/utils/slug.js';

const urlCRUD = import.meta.env.VITE_URL;
const key = import.meta.env.VITE_KEY;

const graphQLClient = new GraphQLClient(urlCRUD, {
	headers: {
		Authorization: `Bearer ${key}`,
	},
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
				parentable_type: "category",
				parentable_uuid: data.get('parentable_uuid'),
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
