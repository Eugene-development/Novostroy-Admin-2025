import { gql } from 'graphql-request';

const mutation = gql`
	mutation create_product($id: UUID!, $key: UUID!, $value: String!, $slug: String) {
		createProduct(input: { id: $id, key: $key, value: $value, slug: $slug }) {
			id
			key
			value
			slug
		}
	}
`;
