import { gql } from "@apollo/client";

export const allTweets = gql`
query {
  allTweets {
    id
    username
    content
    like
    date
  }
}
`