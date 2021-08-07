import {
	Card,
	CardMedia,
	Container,
	Grid,
	IconButton,
	Typography,
} from "@material-ui/core"
import React from "react"
import { useSelector } from "react-redux"
import FriendCard from "./FriendCard"
import useStyles from "./styles"

const FriendsUser = () => {
	const { visitator } = useSelector(state => state.visitator)
	const classes = useStyles()
	return (
		<Container>
			<Grid spacing={2} container>
				{visitator?.friends?.map(friend => (
					<FriendCard key={friend.id} friend={friend} classes={classes} />
				))}
			</Grid>
		</Container>
	)
}

export default FriendsUser
