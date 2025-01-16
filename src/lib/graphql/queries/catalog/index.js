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
			value
			slug
		}
	}
`;

export const CATEGORY = gql`
	query category($slug: String!, $key: UUID!) {
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
