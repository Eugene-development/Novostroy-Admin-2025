import { gql } from 'graphql-request';

export const CREATE_PRODUCT = gql`
	mutation create_product(
		$id: CustomID!
		$key: CustomID!
		$value: String!
		$slug: String!
		$parentable_type: String
		$parentable_id: CustomID
		$images_data: [CreateImageInput!]!
		$taggables_data: [CreateTaggableInput!]!
	) {
		createProduct(
			input: {
				id: $id
				key: $key
				value: $value
				slug: $slug
				parentable_type: $parentable_type
				parentable_id: $parentable_id
				image: { create: $images_data }
				taggables: { create: $taggables_data }
			}
		) {
			id
		}
	}
`;

export const UPDATE_PRODUCT = gql`
	mutation update_product(
		$key: CustomID!
		$value: String!
		$slug: String!
		$id: CustomID!
		$parentable_type: String
		$parentable_id: CustomID
		$is_active: Boolean
		$text_value: UpdateTextInput! # $taggables_data: [CreateTaggableInput!]
		# $images_data: [CreateImageInput!]
	) {
		updateProduct(
			input: {
				id: $id
				key: $key
				value: $value
				slug: $slug
				parentable_type: $parentable_type
				parentable_id: $parentable_id
				is_active: $is_active
				text: { update: $text_value }
				# image: { create: $images_data }
				# taggables: { create: $taggables_data }
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
