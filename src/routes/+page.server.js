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
	ggg2: async ({ request }) => {
		const uuid = crypto.randomUUID();

		const data = await request.formData();

		const var2 = {
			id: uuid,
			key,
			value: data.get('value'),
			slug: "etoslu45555"
		};


		console.log(var2);



		const variables = {
			id: uuid,
			key: "1eb340c2-9795-4d70-a081-aa1a0ec94a84",
			value: "dfdfdfdfdfdfdf",
			slug: "etoslu5"
		};

		const req = await graphQLClient.request(TEST, var2);

		// return { success: req };
	}
};
