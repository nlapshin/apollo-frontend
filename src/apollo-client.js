import { ApolloClient, InMemoryCache, HttpLink, split } from "@apollo/client/core"
import { WebSocketLink } from "@apollo/client/link/ws"
import { getMainDefinition } from "@apollo/client/utilities";

function getHeaders() {
    const headers = {
        'Content-Type': 'application/json'
    }
    const token = 'token'
    if (token) {
        headers["Authorization"] = `${token}`
    }
    return headers
}

// Create an http link:
const httpLink = new HttpLink({
    uri: "http://localhost:3010/graphql",
    fetch: (uri, options) => {
        options.headers = getHeaders()
        return fetch(uri, options)
    },
})

const wsLink = new WebSocketLink({
    uri: `ws://localhost:3010/graphql`,
    options: {
      reconnect: true
    }
  });

// Create the apollo client
export const apolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    link: split(({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === "OperationDefinition" &&
          definition.operation === "subscription"
        );
    }, wsLink, httpLink),
})
