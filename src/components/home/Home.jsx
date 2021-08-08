import React, { useState } from "react"
import { CURRENT_USER } from "../../graphQl/querys/queries"
import { useQuery } from "@apollo/client"
import { printErrors } from "../../helpers/helpers"
import useStyles from "./style"
import Navbar from "./navbar/Navbar"
import { useSelector, useDispatch } from "react-redux"
import { setUser } from "./actions"
import {
	Redirect,
	Route,
	Switch,
	useRouteMatch,
} from "react-router-dom"
import SearchPage from "./searchPage/SearchPage"
import { CircularProgress, Container } from "@material-ui/core"
import UserPage from "./userPage/UserPage"
import AddPost from "./addPost/AddPost"
import MyPostsAndFriends from "./myPostAndFriends/MyPostsAndFriends"
import classNames from "classname"


const Home = () => {
	const { loading, error, data } = useQuery(CURRENT_USER)
	const classes = useStyles()
	const dispatch = useDispatch()
	let { path, url } = useRouteMatch()

	if (error) {
		console.log(error)
	}
	if (data?.me?.username) {
		dispatch(setUser(data.me))
	}
	if(loading){
		return(
			<Container maxWidth={false} className={classNames(classes.mainPage,classes.mainloadingContainer)}>
                <CircularProgress size={300}/>
			</Container>
		)
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
							<MyPostsAndFriends/>
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
				<Redirect to="/login" />
			)}
		</Container>
	)
}
export default Home
