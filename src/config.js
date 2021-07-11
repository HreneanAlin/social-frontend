import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client"
import {createUploadLink} from "apollo-upload-client"
import { onError } from "@apollo/client/link/error"
import { setContext } from '@apollo/client/link/context';
import { persistCache, LocalStorageWrapper } from 'apollo3-cache-persist';
import getRefreshToken from "./getRefreshToken"

const errorLink = onError(({ graphQLErrors, networkError }) => {
	if (graphQLErrors) {
		graphQLErrors.map(({ message, location, path }) => {
			alert(`Graphql error ${message}`)
		})
	}
})

const link = from([
	errorLink,
	// new HttpLink({
	// 	uri: "http://127.0.0.1:8000/graphql/",
	// 	credentials: "same-origin",
	// }),
	  createUploadLink({
		uri: "http://127.0.0.1:8000/graphql/",
		credentials: "same-origin",
	  })
])

const authLink = setContext(async (_, { headers }) => {
	
	let token = localStorage.getItem('token');
	const {data:{refreshToken}} = await getRefreshToken(localStorage.getItem('refreshToken'),token)
    console.log("🚀 ~ file: config.js ~ line 27 ~ authLink ~ newToken", refreshToken.token)
    token = refreshToken.token

	return {
	  headers: {
		...headers,
		authorization: token ? `JWT ${token}` : ""
		
	  }
	}
  });

const cache = new InMemoryCache() 
  
const client = new ApolloClient({
	cache,
	link: authLink.concat(link),
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
