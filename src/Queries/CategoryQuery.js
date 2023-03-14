import { gql } from "@apollo/client";

const CATEGORY = gql`
  query {
    categories {
      name
    }
  }
`;

export default CATEGORY;