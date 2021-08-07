import {
	Avatar,
	CircularProgress,
	ListItem,
	ListItemAvatar,
	ListItemText,
} from "@material-ui/core"
import React from "react"
import { useQuery } from "@apollo/client"
import { CHECK_USER_RELATION } from "../../../../graphQl/querys/queries"
import UserIconType from "./UserIconType"

const UserFound = ({ handleRedirectToUser, url, cUser }) => {
	const { data } = useQuery(CHECK_USER_RELATION, {
		variables: {
			username: cUser.username,
		},
	})
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
			    <UserIconType checkUserRelation={data.checkUserRelation} username={cUser.username}/>
			) : (
				<CircularProgress />
			)}
		</ListItem>
	)
}

export default UserFound
