import { gql } from "@apollo/client";

export const CrearTweet = gql`
mutation($username: String!, $content: String!) {
    addTweet(username: $username, content: $content) {
      id
      username
      content
      date
      like
    }
}
`

export const AñadirFavorito = gql`
mutation($id: ID!) {
    addFavorito(id: $id) {
      id
      username
      content
      like
      date
    }
  }
`

export const EliminarTweet = gql`
mutation($id: ID!) {
    deleteTweet(id: $id)
  }
`

export const EditarTweet = gql`
mutation($id: ID!, $content: String!) {
    editTweet(id: $id, content: $content) {
      id
      username
      content
      date
      like
    }
  }
`