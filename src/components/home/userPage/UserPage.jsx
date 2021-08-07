import {
	Avatar,
	BottomNavigation,
	BottomNavigationAction,
	Button,
	Card,
	CardMedia,
	Container,
	Divider,
	Grid,
	Typography,
} from "@material-ui/core"
import { Route, Link, Switch, useRouteMatch, useHistory } from "react-router-dom"
import React, { useState, useEffect } from "react"
import classNames from "classname"
import EventNoteIcon from "@material-ui/icons/EventNote"
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary"

import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople"
import InfoIcon from "@material-ui/icons/Info"
import useStyles from "../style"
import UserPosts from "./userInfo/userPosts/UserPosts"
import AboutUser from "./userInfo/AboutUser"
import UserPhotos from "./userInfo/UserPhotos"
import queryString from "query-string"
import { useQuery } from "@apollo/client"
import { USER_BY_USERNAME } from "../../../graphQl/querys/queries"
import { useSelector, useDispatch } from "react-redux"
import { setVisitator } from "../actions"
import FriendsUser from "./userInfo/friends/FriendsUser"
const UserPage = () => {
	const classes = useStyles()
	let { path, url } = useRouteMatch()
	const [goUrl,setgoUrl] = useState(url)
	const dispatch = useDispatch()
	const { visitator } = useSelector(state => state.visitator)
	const { username } = queryString.parse(window.location.search)
	const { data } = useQuery(USER_BY_USERNAME, {
		variables: {
			username,
		},
	})
	useEffect(() => {
		if (data?.userByUsername) {
			dispatch(setVisitator(data.userByUsername))
		}
	}, [data])
	const history = useHistory()

	return (
		<Container
			maxWidth="lg"
			className={classNames(classes.userPage, classes.paddingPage)}
		>
			<Card className={classNames(classes.positonRelative)}>
				<CardMedia
					className={classes.coverMedia}
					image="https://cdn.cliqueinc.com/posts/281986/fruits-that-are-high-in-sugar-281986-1566343297126-main.500x0c.jpg?interlace=true&quality=70"
				/>
				<Avatar
					src={`http://127.0.0.1:8000/media/${visitator?.profilePicture}`}
					className={classes.profileAvatar}
				/>
			</Card>
			<Typography variant="h3" align="center" className={classes.userTitle}>
				{visitator?.firstName} {visitator?.lastName}
			</Typography>
			<Typography variant="h5" align="center" color="primary" gutterBottom>
				@{visitator?.username}
			</Typography>
			<Divider />
			<BottomNavigation
				value={goUrl}
				onChange={(event,newValue) =>{
					console.log(newValue);
					setgoUrl(newValue)
					history.push(`${newValue}?username=${username}`)
				}}
				showLabels
				className={classes.userMenuContainer}
			>
				<BottomNavigationAction
					label="Posts"
					value={`${url}`}
					icon={<EventNoteIcon />}
				/>
				<BottomNavigationAction
					label="About"
					value={`${url}/about`}
					icon={<InfoIcon />}
				/>
				<BottomNavigationAction
					label="Friends"
					value={`${url}/friends`}
					icon={<EmojiPeopleIcon />}
				/>
				<BottomNavigationAction
					label="Photos"
					value={`${url}/photos`}
					icon={<PhotoLibraryIcon />}
				/>
			</BottomNavigation>
			{/* <Grid container className={classes.userMenuContainer}>
				<Grid item xs={12} sm={6}>
					<div
						className={classes.buttonGroup}
						
						variant="contained"
					>
						<Button>
							<Link
								to={`/home/user?username=${username}`}
								className={classes.maskLink}
							>
								<EventNoteIcon />
								<Typography> Posts</Typography>
							</Link>
						</Button>

						<Button>
							<Link
								to={`${url}/about?username=${username}`}
								className={classes.maskLink}
							>
								<div>
									<InfoIcon />
									<Typography> About</Typography>
								</div>
							</Link>
						</Button>
						<Button>
							<Link
								to={`${url}/friends?username=${username}`}
								className={classes.maskLink}
							>
								<EmojiPeopleIcon />
								<Typography> Friends</Typography>
							</Link>
						</Button>
						<Button>
							<Link
								to={`${url}/photos?username=${username}`}
								className={classes.maskLink}
							>
								<PhotoLibraryIcon />
								<Typography> Photos</Typography>
							</Link>
						</Button>
					</div>
				</Grid>
			</Grid> */}
			<Switch>
				<Route exact path={path}>
					<UserPosts />
				</Route>
				<Route path={`${path}/about`}>
					<AboutUser />
				</Route>
				<Route path={`${path}/friends`}>
					<FriendsUser />
				</Route>
				<Route path={`${path}/photos`}>
					<UserPhotos />
				</Route>
			</Switch>

			{/* <Grid className={classes.profileContent} container>
				<Grid item xs={12} md={6}>
					<Typography variant="h4" align="center" gutterBottom>
						About
					</Typography>
				</Grid>
			</Grid> */}
		</Container>
	)
}

export default UserPage
