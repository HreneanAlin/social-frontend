import {
	Avatar,
	CircularProgress,
	IconButton,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Tooltip,
} from "@material-ui/core"
import React from "react"
import SendFriendRequest from "../sendFriendRequest/SendFriendRequest"
import { useQuery } from "@apollo/client"
import { CHECK_USER_RELATION } from "../../../../graphQl/querys/queries"
import HowToRegIcon from "@material-ui/icons/HowToReg"
import RecordVoiceOverIcon from "@material-ui/icons/RecordVoiceOver"
import PersonAddDisabledIcon from "@material-ui/icons/PersonAddDisabled"
import SendIcon from "@material-ui/icons/Send"

const UserFound = ({ handleRedirectToUser, url, cUser }) => {
	const { data } = useQuery(CHECK_USER_RELATION, {
		variables: {
			username: cUser.username,
		},
	})
	console.log(data)
	return (
		<ListItem button>
			<ListItemAvatar onClick={() => handleRedirectToUser(url, cUser.username)}>
				<Avatar src={`http://127.0.0.1:8000/media/${cUser.profilePicture}`} />
			</ListItemAvatar>
			<ListItemText
				onClick={() => handleRedirectToUser(url, cUser.username)}
				primary={`${cUser.firstName} ${cUser.lastName}`}
				secondary={`${cUser.username}`}
			/>
			{data?.checkUserRelation ? (
				data.checkUserRelation === "A" || data.checkUserRelation === "MA" ? (
					<Tooltip title="friend">
						<IconButton>
							<HowToRegIcon color="primary" />
						</IconButton>
					</Tooltip>
				) : data.checkUserRelation === "MP" ? (
					<Tooltip title="request send">
						<IconButton>
							<SendIcon color="primary" />
						</IconButton>
					</Tooltip>
				) : data.checkUserRelation === "P" ? (
					<Tooltip title="pending request">
						<IconButton>
							<RecordVoiceOverIcon color="primary" />
						</IconButton>
					</Tooltip>
				) : data.checkUserRelation === "D" ||
				  data.checkUserRelation === "MD" ? (
					<Tooltip title="rejection">
						<IconButton>
							<PersonAddDisabledIcon color="primary" />
						</IconButton>
					</Tooltip>
				) : (
					<SendFriendRequest username={cUser.username} />
				)
			) : (
				<CircularProgress />
			)}
		</ListItem>
	)
}

export default UserFound
