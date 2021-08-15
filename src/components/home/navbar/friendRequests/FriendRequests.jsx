import { Badge, IconButton, Menu, MenuList } from "@material-ui/core"
import PersonIcon from "@material-ui/icons/Person"
import React, { useState, useEffect } from "react"
import { useQuery } from "@apollo/client"
import FriendRequest from "./FriendRequest"
import { MY_FRIEND_REQUESTS } from "../../../../graphQl/querys/queries"
import { NEW_FRIEND_REQUEST } from "../../../../graphQl/subscriptions/subscriptions"

const FriendRequests = ({ username }) => {
	const [anchorEl, setAnchorEl] = useState()
	const { data, loading, subscribeToMore } = useQuery(MY_FRIEND_REQUESTS)
	const handleOpenMenu = event => {
		setAnchorEl(event.currentTarget)
	}
	const handleCloseMenu = () => {
		setAnchorEl(null)
	}

	useEffect(() => {
		if (subscribeToMore) {
			subscribeToMore({
				document: NEW_FRIEND_REQUEST,
				variables: {
					username,
				},
				updateQuery: (prev, { subscriptionData }) => {
					if (!subscriptionData?.data) return prev
					const newItem = subscriptionData.data.newFriendRequest
					return {
						myFriendRequests: [
							new Set([newItem, ...prev.myFriendRequests]),
						].flat(),
					}
				},
			})
		}
	}, [])
	return (
		<>
			<IconButton color="inherit" onClick={handleOpenMenu}>
			
					<Badge badgeContent={data?.myFriendRequests?.length} color="secondary">
						<PersonIcon />
					</Badge>
			
			</IconButton>
			{data?.myFriendRequests?.length > 0 && (
				<Menu
					id="simple-menu"
					anchorEl={anchorEl}
					keepMounted
					open={Boolean(anchorEl)}
					onClose={handleCloseMenu}
				>
					<MenuList>
						{data.myFriendRequests.map(friendReq => (
							<FriendRequest key={friendReq.id} friendReq={friendReq} />
						))}
					</MenuList>
				</Menu>
			)}
		</>
	)
}

export default FriendRequests
