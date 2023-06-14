import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

const createApolloClient = () => {
  const port = import.meta.env.VITE_GRAPHQL_PORT;
  const graphqlEndpoint = `http://localhost:${port}`;

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: graphqlEndpoint
    })
  });
};

export default createApolloClient;