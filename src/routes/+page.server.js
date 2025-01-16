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


		function createSlug(str) {
			const charMap = {
				а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'e',
				ж: 'zh', з: 'z', и: 'i', й: 'y', к: 'k', л: 'l', м: 'm',
				н: 'n', о: 'o', п: 'p', р: 'r', с: 's', т: 't', у: 'u',
				ф: 'f', х: 'kh', ц: 'ts', ч: 'ch', ш: 'sh', щ: 'shch',
				ъ: '', ы: 'y', ь: '', э: 'e', ю: 'yu', я: 'ya'
			};
		
			return str
				.toLowerCase()
				.trim()
				.split('')
				.map(char => charMap[char] || char) // Транслитерация
				.join('')
				.replace(/[\s\W-]+/g, '-')         // Замена пробелов и небуквенных символов на дефисы
				.replace(/^-+|-+$/g, '');          // Удаление лишних дефисов
		}

		const var2 = {
			id: uuid,
			key,
			value: data.get('value'),
			slug: createSlug(data.get('value'))
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
