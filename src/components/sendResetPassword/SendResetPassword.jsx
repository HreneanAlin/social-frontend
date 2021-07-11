import React, { useState } from "react"
import { SEND_PASSWORD_RESET_EMAIL } from "../../graphQl/mutations/mutations"
import { useMutation } from "@apollo/client"
import { printErrors } from "../../helpers/helpers"
import { Button, Container, TextField, Typography } from "@material-ui/core"
import useStyle from "./style"
const SendResetPassword = () => {
	const [email, setEmail] = useState()
	const [sendMail, { data, error, loading }] = useMutation(
		SEND_PASSWORD_RESET_EMAIL
	)

	const classes = useStyle()
	const prepairToSend = e => {
		e.preventDefault()
		sendMail({
			variables: { email },
		})
	}
	if (loading) return <p>Loading...</p>

	return (
		<Container component="main" maxWidth="xs">
			<div className={classes.paper}>
				<Typography component="h1" variant="h5" align="center" gutterBottom>
					Have you forgotten your password?
				</Typography>
				<Typography variant="subtitle1" align="center">
					We will send you an email with the instructions to reset it!
				</Typography>
				{data?.sendPasswordResetEmail?.errors
					? printErrors(data.sendPasswordResetEmail.errors)
					: null}
				{data?.sendPasswordResetEmail?.success ? (
					<Typography
						color="textSecondary"
						paragraph
						variant="h6"
						align="center"
					>
						We have sent the instructions to reset your password at {email}
					</Typography>
				) : (
					<form
						method="post"
						className={classes.form}
						onSubmit={e => prepairToSend(e)}
					>
						<TextField
							fullWidth
							type="email"
							required
							onChange={e => setEmail(e.target.value)}
							variant="outlined"
							id="email"
							label="Email Adress"
							name="email"
							autoComplete="email"
							autoFocus
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
						>
							Send me an email!
						</Button>
					</form>
				)}
			</div>
		</Container>
	)
}

export default SendResetPassword
