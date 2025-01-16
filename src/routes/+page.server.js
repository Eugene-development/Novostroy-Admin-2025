/** @satisfies {import('./$types').Actions} */
import { request, gql, GraphQLClient } from 'graphql-request';
import { TEST } from '$lib/graphql/mutations/catalog/index.js';
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

		const req = await graphQLClient.request(TEST, variables);

		// return { success: req };
	}
};
