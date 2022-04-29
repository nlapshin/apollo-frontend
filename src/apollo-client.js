
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client/core"
import { onError } from "@apollo/client/link/error"
import { logErrorMessages } from "@vue/apollo-util"

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

const errorLink = onError((error) => {
    if (process.env.NODE_ENV !== "production") {
        logErrorMessages(error)
    }
})

// Create the apollo client
export const apolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    link: errorLink.concat(httpLink),
})
