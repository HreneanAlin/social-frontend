import React, { useState, useEffect, useCallback } from "react"
import { useMutation } from "@apollo/client"
import { REGISTER_MUTATION } from "../../graphQl/mutations/mutations"
import { getCountries } from "../../api/api"
import ResendActivation from "../resendActivation/ResendActivation"
import { Link } from "react-router-dom"
import { printErrors } from "../../helpers/helpers"
import {
	Avatar,
	Button,
	Container,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography,
} from "@material-ui/core"
import CheckCircleIcon from "@material-ui/icons/CheckCircle"
import useGeneralStyles from "../../generalStyle"
import AssignmentIcon from "@material-ui/icons/Assignment"
import PasswordField from "../smallComponents/PasswordField"
import ImageUpload from "../smallComponents/ImageUpload"

const Register = () => {
	const [register, { data, error, loading }] = useMutation(REGISTER_MUTATION)
	const [firstName, setFirstName] = useState()
	const [lastName, setLastName] = useState()
	const [username, setUsername] = useState()
	const [email, setEmail] = useState()
	const [password1, setPassword1] = useState()
	const [password2, setPassword2] = useState()
	const [countries, setCountries] = useState([])
	const [sCountry, setsCountry] = useState("Albania")
	const [resend, setResend] = useState(false)
	const [profilePic, setProfilePic] = useState()
	const generalClasses = useGeneralStyles()

	useEffect(() => {
		const getData = async () => {
			const data = await getCountries()
			setCountries(data)
		}
		getData()
	}, [])
	useEffect(() => {
		if (data) {
			const {
				register: { success, token, errors, refreshToken },
			} = data
			if (error) {
				console.log(error)
			}
		}
	}, [data])

	const registerUser = e => {
		e.preventDefault()
		const variables = {
			email: email,
			username: username,
			password1: password1,
			password2: password2,
			firstName: firstName,
			lastName: lastName,
			country: sCountry,
			profilePicture: profilePic,
		}
		register({
			variables,
		})
	}
	if (loading) return <p>Loading...</p>
	return (
		<Container component="main" maxWidth="xs">
			<div className={generalClasses.paper}>
				<Avatar className={generalClasses.avatar}>
					<AssignmentIcon />
				</Avatar>
				<Typography component="h1" variant="h5" gutterBottom>
					Wellcome to FaceRequired
				</Typography>
				{data?.register?.errors ? printErrors(data.register.errors) : null}
				{data?.register?.success ? (
					<div>
						{resend ? (
							<ResendActivation email={email} resend={resend} />
						) : (
							<>
								<Typography variant="body1" align="center">
									We have send an email to {email}.Please follow the
									instructions in your mail to activate your account!
								</Typography>
								<Typography variant="body1" align="center">
									Did you not recieve an Email? We can send your email
									validation again!
								</Typography>
								<Button
									fullWidth
									variant="contained"
									color="primary"
									className={generalClasses.submit}
									onClick={() => setResend(true)}
								>
									Send Email Again
								</Button>
							</>
						)}
					</div>
				) : (
					<>
						<form
							className={generalClasses.form}
							onSubmit={e => registerUser(e)}
							className="register-form"
							method="POST"
						>
							<Grid container spacing="2">
								<Grid item xs={12} sm={6}>
									<ImageUpload
										profilePic={profilePic}
										setProfilePic={setProfilePic}
									/>
								</Grid>
								<Grid item xs={12} sm={6} className={generalClasses.flexCenter}>
									{profilePic ? (
										<CheckCircleIcon color="primary" className={generalClasses.large} />
									) : (
										<Typography xs={12} align="center">Upload your image</Typography>
									)}
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField
										autoComplete="fname"
										name="firstName"
										variant="outlined"
										required
										fullWidth
										id="firstName"
										label="First Name"
										autoFocus
										onChange={e => setFirstName(e.target.value)}
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField
										autoComplete="lname"
										name="lastName"
										variant="outlined"
										required
										fullWidth
										id="lastName"
										label="Last Name"
										onChange={e => setLastName(e.target.value)}
									/>
								</Grid>

								<Grid item xs={12}>
									<TextField
										variant="outlined"
										required
										fullWidth
										id="email"
										label="Email Address"
										name="email"
										autoComplete="email"
										onChange={e => setEmail(e.target.value)}
										type="email"
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										variant="outlined"
										required
										fullWidth
										id="username"
										label="Username"
										name="username"
										onChange={e => setUsername(e.target.value)}
									/>
								</Grid>
								<Grid item xs={12}>
									<PasswordField
										name="password1"
										label="Password"
										password={password1}
										setPassword={setPassword1}
										className={generalClasses.paddingBottom1}
									/>
								</Grid>
								<Grid item xs={12}>
									<PasswordField
										name="password2"
										label="Repeat Password"
										password={password2}
										setPassword={setPassword2}
										className={generalClasses.paddingBottom1}
									/>
								</Grid>
								<Grid item xs={12}>
									<FormControl
										variant="standard"
										className={generalClasses.fullWidth}
									>
										<InputLabel id="country">Country</InputLabel>
										<Select
											labelId="country"
											value={sCountry}
											onChange={e => setsCountry(e.target.value)}
											fullWidth
										>
											{countries.map((country, index) => {
												return (
													<MenuItem key={country} value={country}>
														{country}
													</MenuItem>
												)
											})}
										</Select>
									</FormControl>
								</Grid>
								<Grid item xs={12}>
									<Button
										type="submit"
										fullWidth
										variant="contained"
										color="primary"
										className={generalClasses.submit}
									>
										Create Account
									</Button>
								</Grid>
							</Grid>
						</form>
						<Typography>
							Already have an account? You can login{" "}
							<Link to="/login"> here</Link>
						</Typography>
					</>
				)}
			</div>
		</Container>
	)
}

export default Register
