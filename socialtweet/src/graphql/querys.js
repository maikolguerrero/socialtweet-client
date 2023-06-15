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

export const tweetFavoritos = gql`
query {
  likedTweets {
    content
    date
    id
    like
    username
  }
}
`