import React, { useState, useEffect } from "react"
import { PASSWORD_RESET } from "../../graphQl/mutations/mutations"
import { useMutation } from "@apollo/client"
import { Link } from "react-router-dom"
import queryString from "query-string"
import { printErrors } from "../../helpers/helpers"
import { Container, Typography, TextField, Button } from "@material-ui/core"
import useGeneralStyles from "../../generalStyle"
import PasswordField from "../smallComponents/PasswordField"
const PasswordReset = () => {
	const [password1, setPassword1] = useState()
	const [password2, setPassword2] = useState()
	const [reset, { data, error, loading }] = useMutation(PASSWORD_RESET)
	const generalClasses = useGeneralStyles()

	const prepareToSend = e => {
		e.preventDefault()
		const { tkn } = queryString.parse(window.location.search)
		reset({
			variables: {
				token: tkn,
				password1: password1,
				password2: password2,
			},
		})
	}

	if (loading) return <p>Loading...</p>

	
	return (
		<Container component="main" maxWidth="xs">
			<div className={generalClasses.paper}>
				{data?.passwordReset?.errors
					? printErrors(data.passwordReset.errors)
					: null}
				<Typography component="h1" variant="h5" align="center" gutterBottom>
					Hi, reset your password here!
				</Typography>
				{data?.passwordReset?.success  ? (
					<Typography variant="h6" align="center">
						You have successfully reset your password! Click
						<Link className={generalClasses.links} to="/login"> here </Link>
						to login!
					</Typography>
				) : (
					<form
						method="post"
						className={generalClasses.form}
						onSubmit={prepareToSend}
					>
						<PasswordField
							name="password1"
							label="New Password"
							password={password1}
							setPassword={setPassword1}
							className={generalClasses.paddingBottom1}
						/>
						<PasswordField
							name="password2"
							label="Renter New Password"
							password={password2}
							setPassword={setPassword2}
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={generalClasses.submit}
						>
							Reset Password
						</Button>
					</form>
				)}
			</div>
		</Container>
	)
}

export default PasswordReset
