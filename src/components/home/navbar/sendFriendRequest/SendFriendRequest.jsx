import {
	Button,
	CircularProgress,
	IconButton,
	Tooltip,
} from "@material-ui/core"
import React from "react"
import PersonAddIcon from "@material-ui/icons/PersonAdd"
import SendIcon from '@material-ui/icons/Send';
import { useMutation } from "@apollo/client"
import { SEND_FRIEND_REQUEST } from "../../../../graphQl/mutations/mutations"

const SendFriendRequest = ({ username }) => {
	const [sendRequest, { data, loading }] = useMutation(SEND_FRIEND_REQUEST)
	const handleSendFriendRequest = () => {
		sendRequest({
			variables: { username },
		})
	}
	if (data) {
		console.log(data)
	}
	return (
		<Tooltip title="Add Friend" arrow placement="top">
			{data?.sendFriendRequest?.success ? (
				<Tooltip title="request send">
					<IconButton>
						<SendIcon color="primary" />
					</IconButton>
				</Tooltip>
			) : (
				<IconButton
					onClick={handleSendFriendRequest}
					color="primary"
					aria-label="Add Friend"
				>
					{loading ? <CircularProgress /> : <PersonAddIcon />}
				</IconButton>
			)}
		</Tooltip>
	)
}

export default SendFriendRequest
