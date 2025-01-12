import { gql } from 'graphql-request';

export const SIDEBAR = gql`
	query sidebar($slug: String!, $key: UUID!) {
		catalog(slug: $slug, key: $key) {
			value
			slug
			rubric {
				value
				slug
				category {
					is_active
					value
					slug
					product_count
				}
			}
		}
	}
`;

export const CATALOG = gql`
	query catalog($slug: String!, $key: UUID!) {
		catalog(slug: $slug, key: $key) {
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

export const RUBRIC = gql`
	query rubric($slug: String!, $key: UUID!) {
		rubric(slug: $slug, key: $key) {
			value
			slug
			metaTitle {
				value
			}
			metaDescription {
				value
			}
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

export const PRODUCT = gql`
	query product($slug: String!, $key: UUID!) {
		product(slug: $slug, key: $key) {
			id
			value
			slug
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
	}
`;
