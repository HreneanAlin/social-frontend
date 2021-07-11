import React, { useState, useEffect } from "react"
import { LOGIN_USER } from "../../graphQl/mutations/mutations"
import { useMutation } from "@apollo/client"
import { Redirect } from "react-router-dom"
import {
	Avatar,
	Button,
	CssBaseline,
	TextField,
	Grid,
	Typography,
	Container,

} from "@material-ui/core"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import { Link } from "react-router-dom"
import { printErrors } from "../../helpers/helpers"
import useStyles from "./style"
import classNames from "classname"
import PasswordField from "../smallComponents/PasswordField"
import useGeneralStyles from "../../generalStyle"

const Login = () => {
	const [email, setEmail] = useState()
	const [password, setPassword] = useState()
	
	const [login, { data, error, loading }] = useMutation(LOGIN_USER)
	const classes = useStyles()
	const generalClasses = useGeneralStyles()

	useEffect(() => {
		if (data && !loading) {
			console.log(data)
			const {
				tokenAuth: { success, errors, token, refreshToken, user },
			} = data
			if (success && token && user) {
				user.token = token
				user.refreshToken = refreshToken
				localStorage.setItem("token", token)
				localStorage.setItem("refreshToken", refreshToken)
				//localStorage.setItem("user", JSON.stringify(user))
			}
		}
	}, [data])
	const prepareLogin = e => {
		e.preventDefault()
		login({
			variables: {
				email,
				password,
			},
		})
	}


	if (loading) return <p>Loading...</p>
	if (data?.tokenAuth?.success) return <Redirect to="/home" />
	return (
		<Container component="main" maxWidth="xs">
			
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5" gutterBottom>
					Wellcome to FaceRequired
				</Typography>
				<Typography variant="h5">Sign in</Typography>
				{data?.tokenAuth?.errors ? printErrors(data.tokenAuth.errors) : null}
				<form className={classes.form} onSubmit={e => prepareLogin(e)}>
					<TextField
						required
						onChange={e => setEmail(e.target.value)}
						variant="outlined"
						margin="normal"
						fullWidth
						id="email"
						label="Email Adress"
						name="email"
						type="email"
						autoComplete="email"
						autoFocus
					/>
			        <PasswordField
					 name="password"
					 label="Password"
					 password={password}
					 setPassword={setPassword}
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						Sign In
					</Button>
					<Grid container>
						<Grid item xs>
							<Link className={classes.links} to="/send-pass-email">
								Forgot password?
							</Link>
						</Grid>
						<Grid item xs>
							<Link
								className={classNames(classes.links, classes.padding)}
								to="/register"
							>
								Don't have an account? Join
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
		</Container>
	)
}

export default Login