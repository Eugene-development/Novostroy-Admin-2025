import { gql } from 'graphql-request';

export const CREATE_PRODUCT = gql`
	mutation create_product(
		$id: UUID!
		$key: UUID!
		$value: String!
		$slug: String
		$parentable_type: String
		$parentable_id: UUID
		$images_hash: [CreateImageInput!]!
	) {
		createProduct(
			input: {
				id: $id
				key: $key
				value: $value
				slug: $slug
				parentable_type: $parentable_type
				parentable_id: $parentable_id
				image: { create: $images_hash }
			}
		) {
			id
		}
	}
`;

// export const CREATE_PRODUCT = gql`
// 	mutation create_product(
// 		$id: UUID!
// 		$key: UUID!
// 		$value: String!
// 		$slug: String
// 		$parentable_type: String
// 		$parentable_id: UUID
// 	) {
// 		createProduct(
// 			input: {
// 				id: $id
// 				key: $key
// 				value: $value
// 				slug: $slug
// 				parentable_type: $parentable_type
// 				parentable_id: $parentable_id
// 			}
// 		) {
// 			id
// 			key
// 			value
// 			slug
// 			# parentable
// 		}
// 	}
// `;
