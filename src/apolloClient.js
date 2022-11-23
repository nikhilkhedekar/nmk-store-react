import { ApolloClient, InMemoryCache } from "@apollo/client";

export const apolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "https://nmk-store-apollo.herokuapp.com/graphql"
});