/** @type {import('./$types').PageServerLoad} */
import { request, gql, GraphQLClient } from 'graphql-request';
import { CATEGORY } from '$lib/graphql/queries/catalog/index.js';
import { CREATE_PRODUCT } from '$lib/graphql/mutations/catalog/index.js';
import { createSlug } from '$lib/utils/slug.js';
import { ulid } from 'ulid'; // Import the ULID library

// TEST DeepSeek
// import OpenAI from "openai";

export async function load({ params, url }) {
	const urlCRUD = import.meta.env.VITE_URL_CRUD;
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

const urlCRUD = import.meta.env.VITE_URL_CRUD;
const key = import.meta.env.VITE_KEY;

const graphQLClient = new GraphQLClient(urlCRUD, {
	headers: {
		Authorization: `Bearer ${key}`
	}
});

export const actions = {
	addProduct: async ({ request }) => {
		try {
			// TEST DeepSeek
			// 	const openai = new OpenAI({
			// 		baseURL: 'https://api.deepseek.com',
			// 		apiKey: 'sk-079a36e8f7b44f04ae26c560847028ee'
			// });
			//   const completion = await openai.chat.completions.create({
			// 	messages: [{ role: "system", content: "Hello." }],
			// 	model: "deepseek-chat",
			//   });

			//   console.log(completion.choices[0].message.content);
			//

			const data = await request.formData();

			const imagesHash = JSON.parse(data.get('currentImagesHash'));
			const taggablesID = JSON.parse(data.get('currentTagsID'));

			const uuid = crypto.randomUUID();
			// const ulid = ulid();
			// console.log(ulid);
			// Generate a ULID for the product
			// Use Promise.all with setTimeout to add a 5ms delay between each ULID generation
			const images_data = await Promise.all(
				imagesHash.map(async (obj, index) => {
					// Add a delay of 5ms multiplied by the index to ensure each ULID has a different timestamp
					await new Promise((resolve) => setTimeout(resolve, 5 * index));
					return {
						...obj,
						id: ulid(),
						key,
						alt: data.get('value'),
						parentable_type: 'product',
						parentable_id: uuid
					};
				})
			);

			console.log(images_data);

			const taggables_data = taggablesID.map((obj) => ({
				...obj,
				taggable_type: 'product',
				taggable_id: uuid
			}));

			const variables = {
				id: uuid,
				key,
				value: data.get('value'),
				slug: createSlug(data.get('value')),
				parentable_type: 'category',
				parentable_id: data.get('category_uuid'),
				images_data,
				taggables_data
				// images: JSON.parse(data.get('currentImages')) // Захардкодить для проверки
			};

			const result = await graphQLClient.request(CREATE_PRODUCT, variables);

			return { success: true, data: result };
		} catch (error) {
			console.error('Error creating product:', error);
			return { success: false, error: error.message };
		}
	}
};
