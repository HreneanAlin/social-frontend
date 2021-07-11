import { ApolloProvider } from "@apollo/client"
import client from "./config"
import {
	BrowserRouter as Router,
	Redirect,
	Route,
	Switch,
} from "react-router-dom"
import Home from "./components/home/Home"
import Register from "./components/register/Register"
import Login from "./components/login/Login"
import UserActivation from "./components/userActivation/UserActivation"
import SendResetPassword from "./components/sendResetPassword/SendResetPassword"
import PasswordReset from "./components/passwordReset/PasswordReset"
import Logout from "./components/logOut/Logout"
import { Container, CssBaseline } from "@material-ui/core"
import useGeneralStyles from "./generalStyle"

function App() {
	const classes = useGeneralStyles()
	return (
		<ApolloProvider client={client}>
			<CssBaseline />
			<Router>
				<Switch>
					<Route exact path="/">
						<Redirect to="/home" />
					</Route>
					<Route path="/home">
						<Home />
					</Route>
					<Route path="/register">
						<Register />
					</Route>
					<Route path="/login">
						<Login />
					</Route>
					<Route path="/activation">
						<UserActivation />
					</Route>
					<Route path="/send-pass-email">
						<SendResetPassword />
					</Route>
					<Route path="/password-reset">
						<PasswordReset />
					</Route>
					<Route path="/logout">
						<Logout />
					</Route>
				</Switch>
			</Router>
		</ApolloProvider>
	)
}

export default App
