import { gql } from 'graphql-request';

export const FULLCATALOG = gql`
	query fullcatalog {
		fullcatalog {
			value
			slug
			metaTitle {
				value
			}
			metaDescription {
				value
			}
			rubric {
				value
				slug
				category {
					is_active
					value
					slug
				}
			}
			text {
				value
			}
			image {
				hash
			}
		}
	}
`;
