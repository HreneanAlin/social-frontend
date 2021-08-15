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
	CircularProgress,
} from "@material-ui/core"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import { Link } from "react-router-dom"
import { printErrors } from "../../helpers/helpers"
import useStyles from "./style"
import classNames from "classname"
import PasswordField from "../smallComponents/PasswordField"
import useGeneralStyles from "../../generalStyle"
import { CURRENT_USER } from "../../graphQl/querys/queries"

const Login = () => {
	const [email, setEmail] = useState()
	const [password, setPassword] = useState()
	const tkn = localStorage.getItem("token")
	const [login, { data, error, loading }] = useMutation(LOGIN_USER)
	const classes = useStyles()


	const prepareLogin = e => {
		e.preventDefault()
		login({
			variables: {
				email,
				password,
			},
			update: (store, { data }) => {
				if (data?.tokenAuth.user) {
					localStorage.setItem("token",data.tokenAuth.token)
					localStorage.setItem("refreshToken",data.tokenAuth.refreshToken)
					store.writeQuery({
						query: CURRENT_USER,
						data: {
							me: data.tokenAuth.user,
						},
					})
				}
			},
		})
	}
	
	if(tkn){
		return <Redirect to="/"/>
	}
	
	if (loading)
		return (
			<Container component="main" maxWidth="xs">
				<div className={classes.paper}>
					<CircularProgress />
				</div>
			</Container>
		)
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
