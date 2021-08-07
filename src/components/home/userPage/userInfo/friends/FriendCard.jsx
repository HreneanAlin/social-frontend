import {
	Card,
	CardContent,
	CardMedia,
	Grid,
	Typography,
} from "@material-ui/core"
import React from "react"
import { useHistory,useRouteMatch, } from "react-router-dom"

const FriendCard = ({ friend, classes }) => {
	const history = useHistory()
	let { path, url } = useRouteMatch()
	const handleRedirectToFriend = () => {
		history.push(`/home/user?username=${friend.username}`)
	}
	return (
		<Grid item xs={6} lg={3}>
			<Card onClick={handleRedirectToFriend} className={classes.root}>
				<div className={classes.details}>
					<CardContent className={classes.content}>
						<Typography component="h5" variant="h5">
							{friend.firstName} {friend.lastName}
						</Typography>
						<Typography variant="subtitle1" color="textSecondary">
							@{friend.username}
						</Typography>
					</CardContent>
				</div>
				<CardMedia
					className={classes.cover}
					image={`http://127.0.0.1:8000/media/${friend.profilePicture}`}
					title="Profile Picture"
				/>
			</Card>
		</Grid>
	)
}

export default FriendCard
