import React, { useEffect, useState } from "react"
import { VERIFY_ACCOUNT } from "../../graphQl/mutations/mutations"
import { useMutation } from "@apollo/client"
import queryString from "query-string"
import { Avatar, Container, Typography } from "@material-ui/core"
import CheckCircleIcon from "@material-ui/icons/CheckCircle"
import ErrorIcon from "@material-ui/icons/Error"
import useGeneralStyles from "../../generalStyle"
import { Link, Redirect } from "react-router-dom"
import { printErrors } from "../../helpers/helpers"

const UserActivation = () => {
	const generalClasses = useGeneralStyles()
	const [empty, setEmpty] = useState(false)
	const [activateAccount, { data, error, loading }] = useMutation(
		VERIFY_ACCOUNT
	)

	const { tkn } = queryString.parse(window.location.search)
	useEffect(() => {
		if (tkn) {
			console.log(tkn)
			activateAccount({
				variables: {
					token: tkn,
				},
			})
		}else{
          setEmpty(true)
		}
	}, [])
	if(empty){
		return <Redirect to="/register"/>
	}
	
	if (loading) return <h1>Loading...</h1>

	return (
		<Container component="main" maxWidth="xs">
			<div className={generalClasses.paper}>
				{data?.verifyAccount?.errors ? (
					<>
					<ErrorIcon className={generalClasses.large} color="error"/>
					{printErrors(data.verifyAccount.errors)}
					</>
				) : null}
				{data?.verifyAccount?.success ? (
					<>
						<CheckCircleIcon className={generalClasses.large} color="primary" />
						<Typography component="h1" variant="h5">
							Hi, your accout is activated
						</Typography>
						<Typography variant="body1">
							You can sign in{" "}
							<Link className={generalClasses.links} to="/login">
								here
							</Link>
						</Typography>
					</>
				) : null}
			</div>
		</Container>
	)
}

export default UserActivation
