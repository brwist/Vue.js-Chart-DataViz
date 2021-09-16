import gql from "graphql-tag";

export const LOAD_DATA = gql`
  query Data {
    data {
      name
      displayName
    }
  }
`;