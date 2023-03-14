import { gql } from "@apollo/client";

const CURRENCIES = gql`
  query {
    currencies {
      symbol
      label
    }
  }
`;

export default CURRENCIES;