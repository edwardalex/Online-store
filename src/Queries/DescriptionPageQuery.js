import { gql } from "@apollo/client";

const DESCRIPTION = gql`
  query getProduct($product_id: String!) {
    product(id: $product_id) {
      id
      name
      brand
      gallery
      category
      description
      inStock
      attributes {
        name
        type
        id
        items {
          displayValue
          value
          id
        }
      }
      prices {
        amount
        currency {
          symbol
          label
        }
      }
    }
  }
`;

export default DESCRIPTION;