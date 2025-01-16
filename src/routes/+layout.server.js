/** @satisfies {import('./$types').Actions} */
import { request, gql, GraphQLClient } from 'graphql-request';

// import TEST from '$lib/graphql/mutations/catalog/index.js';
const urlCRUD = import.meta.env.VITE_URL;
const key = import.meta.env.VITE_KEY;

const graphQLClient = new GraphQLClient(urlCRUD, {
	headers: {
		Authorization: `Bearer ${key}`,
	},
});




export const actions = {
	ggg2: async () => {






	
		const TEST = gql`
	mutation create_product($id: UUID!, $key: UUID!, $value: String!, $slug: String) {
		createProduct(input: { id: $id, key: $key, value: $value, slug: $slug }) {
			id
			key
			value
			slug
		}
			}
		`;

		const variables = {
			id: "9eb340c2-9795-4d70-a081-aa1a0ec94a84",
			key: "9eb340c2-9795-4d70-a081-aa1a0ec94a84",
			value: "тестовое значение3",
			slug: "etoslu3"
		};

		const req = await graphQLClient.request(TEST, variables);
		console.log(req);

		// return { success: true };
	}
};
