import { removeArgumentsFromDocument } from "@apollo/client/utilities"
import {
	Avatar,
	Button,
	CircularProgress,
	Grid,
	IconButton,
	ListItem,
	ListItemAvatar,
	ListItemSecondaryAction,
	Typography,
} from "@material-ui/core"
import React from "react"
import { Link, useHistory } from "react-router-dom"
import { useQuery } from "@apollo/client"
import UserIconType from "../navbar/userFound/UserIconType"
import { CHECK_USER_RELATION } from "../../../graphQl/querys/queries"

const ExtendedFoundUser = ({ cUser, classes }) => {
	const { data } = useQuery(CHECK_USER_RELATION, {
		variables: {
			username: cUser.username,
		},
	})
	const history = useHistory()
	const handleRedirectToUser = username => {
		history.push(`user?username=${username}`)
	}
	return (
		<ListItem className={classes.searchResultItem}>
			<ListItemAvatar onClick={() => handleRedirectToUser(cUser.username)}>
				<IconButton>
					<Avatar
						className={classes.avatarLarge}
						src={`http://127.0.0.1:8000/media/${cUser.profilePicture}`}
					/>
				</IconButton>
			</ListItemAvatar>
			<Grid container>
				<Grid item xs={12} md={12} lg={3}>
					<Typography variant="h5">
						{cUser.firstName} {cUser.lastName}
					</Typography>
				</Grid>
				<Grid item container xs={12} md={6} lg={3} alignContent="flex-end">
					<Typography variant="body1" color="textSecondary">
						{cUser.username}
					</Typography>
				</Grid>
				<Grid item container xs={12} md={6} lg={3} alignContent="flex-end">
					<Typography variant="body1" color="textSecondary">
						lives in: {cUser.country}
					</Typography>
				</Grid>
			</Grid>

			<ListItemSecondaryAction>
				{data?.checkUserRelation ? (
					<UserIconType
						checkUserRelation={data.checkUserRelation}
						username={cUser.username}
					/>
				) : (
					<CircularProgress />
				)}
			</ListItemSecondaryAction>
		</ListItem>
	)
}

export default ExtendedFoundUser
