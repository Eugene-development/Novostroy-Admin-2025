/** @satisfies {import('./$types').Actions} */
import { request, gql, GraphQLClient } from 'graphql-request';

import { TEST } from '$lib/graphql/mutations/catalog/index.js';

const urlCRUD = import.meta.env.VITE_URL;
const key = import.meta.env.VITE_KEY;

const graphQLClient = new GraphQLClient(urlCRUD, {
	headers: {
		Authorization: `Bearer ${key}`,
	},
});




export const actions = {
	ggg2: async () => {
		const uuid = crypto.randomUUID();
		console.log(uuid);



		const variables = {
			id: uuid,
			key: "1eb340c2-9795-4d70-a081-aa1a0ec94a84",
			value: "dfdfdfdfdfdfdf",
			slug: "etoslu5"
		};

		const req = await graphQLClient.request(TEST, variables);

		// return { success: req };
	}
};
