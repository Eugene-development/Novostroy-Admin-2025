import { gql } from 'graphql-request';

export const FULLCATALOG = gql`
	query fullcatalog {
		fullcatalog {
			value
			slug
			rubric {
				value
				slug
				parentable {
					... on Catalog {
						value
						slug
					}
				}

				category {
					is_active
					value
					slug
					parentable {
						... on Rubric {
							value
							slug
							parentable {
								... on Catalog {
									value
									slug
								}
							}
						}
					}
				}
			}
		}
	}
`;

export const FULLCATEGORY = gql`
	query fullcategory {
		fullcategory {
			id
			value
		}
	}
`;

export const CATEGORY = gql`
	query category($slug: String!, $key: CustomID!) {
		category(slug: $slug, key: $key) {
			value
			slug
			metaTitle {
				value
			}
			metaDescription {
				value
			}
			product {
				id
				value
				slug
				created_at
				updated_at

				unit {
					value
				}
				price {
					value
				}
				image {
					hash
				}
				tag {
					value
				}
				text {
					value
				}
				parentable {
					... on Category {
						value
						slug
						parentable {
							... on Rubric {
								value
								slug
								parentable {
									... on Catalog {
										value
										slug
									}
								}
							}
						}
					}
				}
			}
			parentable {
				... on Rubric {
					value
					slug
					parentable {
						... on Catalog {
							value
							slug
						}
					}
				}
			}
		}
	}
`;

export const ALL_TAGS = gql`
	query allTags($key: CustomID!) {
		all_tags(key: $key) {
			id
			value
		}
	}
`;
