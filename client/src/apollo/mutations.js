import gql from "graphql-tag";

export const TEST_MUTATION = gql`
  mutation Test($a: String!, $arr: [YourTypeHere!]!) {
    createCommit(a: $a, arr: $arr) {
      name
      commitTime
    }
  }
`;