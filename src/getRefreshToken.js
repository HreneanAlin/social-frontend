import axios from "axios"

const getRefreshToken = async (refreshTokenOld, token) => {
	try {
		const {data}  = await axios({
			url: "http://127.0.0.1:8000/graphql/",
			method: "post",
			credentials: "same-origin",
			headers: {
				authorization: token ? `JWT ${token}` : "",
			},
			data: {
				query: `
			    mutation {
					refreshToken(refreshToken: "${refreshTokenOld}"){
						success
						errors
						token
						refreshToken
					}
			  }`,
			},
		})
		console.log("data from get refresh",data)
         if(data?.refreshToken?.success){
			 
			 localStorage.setItem("token",data.refreshToken.token)
			 localStorage.setItem("refreshToken",data.refreshToken.refreshToken)
             
		 }
		 if(data?.refreshToken?.errors){
			 throw "Error at token refresh"
		 }
	
		 return data
	} catch (err) {
		console.log(err)
	}
}

export default getRefreshToken
