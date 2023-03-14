import { gql } from "@apollo/client";

const LIST = gql`
  query category($input: CategoryInput) {
    category(input: $input) {
      name
      products {
        gallery
        id
        name
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
          currency {
            label
            symbol
          }
          amount
        }
        inStock
        brand
      }
    }
  }
`;

export default LIST;