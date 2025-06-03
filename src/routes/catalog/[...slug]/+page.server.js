/** @type {import('./$types').PageServerLoad} */
import { request, gql, GraphQLClient } from 'graphql-request';
import { CATEGORY } from '$lib/graphql/queries/catalog/index.js';
import {
	CREATE_PRODUCT,
	UPDATE_PRODUCT,
	DELETE_PRODUCT
} from '$lib/graphql/mutations/catalog/index.js';
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
			const data = await request.formData();

			const imagesHash = JSON.parse(data.get('currentImagesHash'));

			const taggablesID = JSON.parse(data.get('currentTagsID'));

			const uuid = crypto.randomUUID();
			const images_data = [];
			for (let index = 0; index < imagesHash.length; index++) {
				await new Promise((resolve) => setTimeout(resolve, 5 * (index + 1))); // Задержка: 5, 10, 15... мс
				const obj = imagesHash[index];
				images_data.push({
					...obj,
					id: ulid(),
					key,
					alt: data.get('value'),
					parentable_type: 'product',
					parentable_id: uuid
				});
			}

			// console.log(images_data);

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
	},

	updateProduct: async ({ request }) => {
		try {
			const data = await request.formData();

			const productId = data.get('product_id');
			const imagesHash = JSON.parse(data.get('currentImagesHash'));
			const taggablesID = JSON.parse(data.get('currentTagsID'));

			// Подготавливаем данные изображений для обновления
			const images_data = [];
			const newImages = imagesHash.filter((img) => !img.id); // Новые изображения не имеют id

			for (let index = 0; index < newImages.length; index++) {
				await new Promise((resolve) => setTimeout(resolve, 5 * (index + 1)));
				const obj = newImages[index];
				images_data.push({
					...obj,
					id: ulid(),
					key,
					alt: data.get('value'),
					parentable_type: 'product',
					parentable_id: productId
				});
			}

			// Подготавливаем данные тегов
			const taggables_data = taggablesID.map((obj) => ({
				...obj,
				taggable_type: 'product',
				taggable_id: productId
			}));

			// Обновляем структуру переменных для мутации updateProduct
			const variables = {
				key,
				value: data.get('value'),
				slug: createSlug(data.get('value')),
				id: productId,
				parentable_type: 'category',
				parentable_id: data.get('category_uuid'),
				is_active: data.get('is_active') === 'true',
				text_value: { id: data.get('description_id'), value: data.get('description'), key },
				images_data: images_data.length > 0 ? images_data : undefined,
				taggables_data: taggables_data.length > 0 ? taggables_data : undefined
			};

			const result = await graphQLClient.request(UPDATE_PRODUCT, variables);

			return { success: true, data: result };
		} catch (error) {
			console.error('Error updating product:', error);
			return { success: false, error: error.message };
		}
	},

	deleteProduct: async ({ request }) => {
		try {
			const data = await request.formData();
			const productId = data.get('product_id');
			const variables = {
				id: productId,
				key
			};
			const result = await graphQLClient.request(DELETE_PRODUCT, variables);
			return { success: true, data: result };
		} catch (error) {
			console.error('Error deleting product:', error);
			return { success: false, error: error.message };
		}
	}
};
