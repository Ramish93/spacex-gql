import { ApolloClient, InMemoryCache } from "@apollo/client";

export const apolloClient = new ApolloClient({
  uri: "https://api.spacex.land/graphql/",
  cache: new InMemoryCache(),
});

export const apolloClientSave = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});

export const apolloClientDelete = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});
