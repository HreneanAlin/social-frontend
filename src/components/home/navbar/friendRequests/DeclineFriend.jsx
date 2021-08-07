import { IconButton, Tooltip } from "@material-ui/core"
import CloseIcon from "@material-ui/icons/Close"
import { useMutation } from "@apollo/client"
import React from "react"
import { DECLINE_FRIEND_REQUEST } from "../../../../graphQl/mutations/mutations"

const DeclineFriend = ({ id }) => {
	const [declineFriend, { data }] = useMutation(DECLINE_FRIEND_REQUEST)

	const handleDeclineFriend = () => {
		declineFriend({
			variables: {
				friendRequestId: id,
			},
			update: (store) => {
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
		<Tooltip title="Decline">
			<IconButton onClick={handleDeclineFriend}>
				<CloseIcon />
			</IconButton>
		</Tooltip>
	)
}

export default DeclineFriend
