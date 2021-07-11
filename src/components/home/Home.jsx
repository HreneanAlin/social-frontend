import React, { useState } from "react"
import { CURRENT_USER } from "../../graphQl/querys/queries"
import { useQuery } from "@apollo/client"
import { printErrors } from "../../helpers/helpers"
import useStyles from "./style"
import Navbar from "./navbar/Navbar"
import { useSelector, useDispatch } from "react-redux"
import { setUser } from "./actions"
import {
	Route,
	Switch,
	useRouteMatch,
} from "react-router-dom"
import SearchPage from "./searchPage/SearchPage"
import { Container } from "@material-ui/core"
import UserPage from "./userPage/UserPage"
import AddPost from "./addPost/AddPost"

const Home = () => {
	const { loading, error, data } = useQuery(CURRENT_USER)
	const classes = useStyles()
	const dispatch = useDispatch()
	let { path, url } = useRouteMatch()
	console.log("🚀 ~ file: Home.jsx ~ line 23 ~ Home ~ path,", `${path}/search`)

	if (error) {
		console.log(error)
	}
	console.log(data)
	if (data?.me?.username) {
		dispatch(setUser(data.me))
	}

	return (
		<Container maxWidth={false} className={classes.mainPage}>
			{data?.me?.errors ? printErrors(data.me.errors) : null}
			{data?.me ? (
				<>
					<Navbar />
					<Switch>
						<Route exact path={path}>
							<AddPost/>
						</Route>
						<Route path={`${path}/search`}>
							<SearchPage />
						</Route>
						<Route path={`${path}/user`}>
							<UserPage />
						</Route>
					</Switch>
				</>
			) : (
				"not autheticated"
			)}
		</Container>
	)
}
export default Home
