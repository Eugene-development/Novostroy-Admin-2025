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
    text {
      value
    }
    image {
      hash
    }
  }
}


`;
