import React, { useEffect } from "react"
import { LOG_OUT } from "../../graphQl/mutations/mutations"
import { useMutation } from "@apollo/client"
import { CURRENT_USER } from "../../graphQl/querys/queries"
import { Redirect } from "react-router-dom"

const Logout = () => {
	const [logout, { data, error, loading }] = useMutation(LOG_OUT)
	useEffect(() => {
		const refreshToken = localStorage.getItem("refreshToken")
		logout({
			variables: {
				refreshToken,
			},
			update: (store, { data }) => {
				store.writeQuery({
					query: CURRENT_USER,
					data: {
						me: null,
					},
				})
			},
		})
		localStorage.removeItem("refreshToken")
		localStorage.removeItem("token")
		localStorage.removeItem("apollo-cache-persist")
	}, [])

	return <Redirect to="/login" />
}

export default Logout
