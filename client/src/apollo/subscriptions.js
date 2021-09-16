import gql from "graphql-tag";

export const TEST_SUB = gql`
  subscription {
    testSubscription {
      id
      subject
      source
      type
    }
  }
`;