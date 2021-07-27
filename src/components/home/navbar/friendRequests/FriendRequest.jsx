import {
	Avatar,
	IconButton,
	ListItemAvatar,
	MenuItem,
	Tooltip,
	Typography,
} from "@material-ui/core"
import React from "react"
import AcceptFriend from "./AcceptFriend"
import DeclineFriend from "./DeclineFriend"

const FriendRequest = ({ friendReq }) => {
	return (
		<MenuItem>
			<ListItemAvatar>
				<Avatar
					src={`http://127.0.0.1:8000/media/${friendReq.userFrom.profilePicture}`}
				/>
			</ListItemAvatar>
			<Typography>{friendReq.userFrom.username}</Typography>
			<AcceptFriend />
			<DeclineFriend />
		</MenuItem>
	)
}

export default FriendRequest
