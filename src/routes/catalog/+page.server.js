/** @type {import('./$types').PageServerLoad} */
import { request } from 'graphql-request';
import { CATALOG, RUBRIC, CATEGORY, PRODUCT } from './query';

export async function load({ params, url }) {
	const urlCRUD = import.meta.env.VITE_URL;
	const key = import.meta.env.VITE_KEY;

	const segments = url.pathname.split('/').filter((segment) => segment.length > 0);

	let isCatalog, isRubric, isCategory, isProduct;

	switch (segments.length) {
		case 1:
			try {
				const variables = {
					key,
					slug: segments[0]
				};
				const req = await request(urlCRUD, CATALOG, variables);
				return {
					req,
					isCatalog: true
				};
			} catch (error) {
				console.log(error);
			}

			break;

		case 2:
			try {
				const variables = {
					key,
					slug: segments[1]
				};
				// TODO fix RUBRIC нужен бекенд
				const req = await request(urlCRUD, RUBRIC, variables);
				return {
					req,
					isRubric: true
				};
			} catch (error) {
				console.log(error);
			}

			break;

		case 3:
			try {
				const variables = {
					key,
					slug: segments[2]
				};
				const req = await request(urlCRUD, CATEGORY, variables);
				return {
					req,
					isCategory: true
				};
			} catch (error) {
				console.log(error);
			}

			break;

		case 4:
			try {
				const variables = {
					key,
					slug: segments[3]
				};
				const req = await request(urlCRUD, PRODUCT, variables);
				return {
					req,
					isProduct: true
				};
			} catch (error) {
				console.log(error);
			}

			break;
	}
}
