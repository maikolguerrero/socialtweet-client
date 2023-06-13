import { gql } from "@apollo/client";

export const CrearTweet = gql`
mutation($username: String!, $content: String!, $date: String!, $like: Boolean!) {
    addTweet(username: $username, content: $content, date: $date, like: $like) {
      content
      date
      like
      username
      id
    }
}
`

export const AñadirFavorito = gql`
mutation($like: Boolean!, $addFavoritoId: ID!) {
    addFavorito(like: $like, id: $addFavoritoId) {
      username
      content
      like
      date
      id
    }
  }
`

export const EliminarTweet = gql`
mutation($deleteTweetId: ID!) {
    deleteTweet(id: $deleteTweetId) {
      content
      date
      id
      like
      username
    }
  }
`

export const EditarTweet = gql`
mutation($editTweetId: ID!, $content: String!) {
    editTweet(id: $editTweetId, content: $content) {
      content
      date
      id
      like
      username
      
    }
  }
`