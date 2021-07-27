import {
	ApolloClient,
	InMemoryCache,
	HttpLink,
	from,
	split,
	ApolloLink,
} from "@apollo/client"
import { getMainDefinition } from "@apollo/client/utilities"
import { createUploadLink } from "apollo-upload-client"
import { onError } from "@apollo/client/link/error"
import { setContext } from "@apollo/client/link/context"
import { persistCache, LocalStorageWrapper } from "apollo3-cache-persist"
import getRefreshToken from "./getRefreshToken"
import { WebSocketLink } from "@apollo/client/link/ws"

const errorLink = onError(({ graphQLErrors, networkError }) => {
	if (graphQLErrors) {
		graphQLErrors.map(({ message, location, path }) => {
			alert(`Graphql error ${message}`)
		})
	}
})
const wsLink = new WebSocketLink({
	uri: "ws://127.0.0.1:8000/graphql/",
	options: {
		reconnect: true,
	
	},
	 credentials: "include",

	 
})

const link = from([
	errorLink,
	createUploadLink({
		uri: "http://127.0.0.1:8000/graphql/",
		credentials: "include",
	}),
])



const authLink = setContext(async (_, { headers }) => {
	
	
	let token = localStorage.getItem("token")
	const {
		data: { refreshToken },
	} = await getRefreshToken(localStorage.getItem("refreshToken"), token)
	token = refreshToken.token

	return {
		headers: {
			...headers,
			authorization: token ? `JWT ${token}` : "",
			
		},
	}
})

const cache = new InMemoryCache()
const splitLink = split(
	({ query }) => {
		const definition = getMainDefinition(query)
		return (
			definition.kind === "OperationDefinition" &&
			definition.operation === "subscription"
		)
	},
	authLink.concat(wsLink),
	authLink.concat(link)
)

const client = new ApolloClient({
	cache,
	link: splitLink,
	credentials:"include"

	
})



const initData = "this is the init data"

// persistCache({
//     cache,
//     storage: window.localStorage
// }).then(() => {
//     client.onResetStore(async () => cache.writeData({
//         data: initData
//     }));

// });

export default client
