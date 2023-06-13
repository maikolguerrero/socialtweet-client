import { gql } from "@apollo/client";

export const allTweets = gql`
query {
  allTweets {
    content
    username
    like
    id
    date
  }
}
`