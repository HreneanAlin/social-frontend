import { IconButton, Tooltip } from "@material-ui/core"
import DoneIcon from "@material-ui/icons/Done"
import React from "react"
import { useMutation } from "@apollo/client"
import { ACCEPT_FRIEND_REQUEST } from "../../../../graphQl/mutations/mutations"
import { MY_FRIEND_REQUESTS } from "../../../../graphQl/querys/queries"

const AcceptFriend = ({ id }) => {
	const [acceptFriend, { data }] = useMutation(ACCEPT_FRIEND_REQUEST)

	const handleAcceptFriend = () => {
		acceptFriend({
			variables: {
				friendRequestId: id,
			},
			update: (store, { data }) => {
				const normalizedId = store.identify({
					id,
					__typename: "FriendRequestType",
				})
				store.evict({ id: normalizedId })
				store.gc()
			},
		})
	}
	return (
		<Tooltip title="Accept">
			<IconButton onClick={handleAcceptFriend} color="primary">
				<DoneIcon />
			</IconButton>
		</Tooltip>
	)
}

export default AcceptFriend
