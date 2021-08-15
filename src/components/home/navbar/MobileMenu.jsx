import { Avatar, Badge, IconButton, Menu, MenuItem } from "@material-ui/core"
import {useSelector} from 'react-redux'
import MailIcon from "@material-ui/icons/Mail"
import NotificationsIcon from "@material-ui/icons/Notifications"
import AccountCircle from "@material-ui/icons/AccountCircle"
import React from "react"
import FriendRequests from "./friendRequests/FriendRequests"

const MobileMenu = ({
	mobileMoreAnchorEl,
	mobileMenuId,
	isMobileMenuOpen,
	handleMobileMenuClose,
	handleProfileMenuOpen
}) => {
	const {user}= useSelector(state=> state.user)
	return (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{ vertical: "top", horizontal: "right" }}
			id={mobileMenuId}
			keepMounted
			transformOrigin={{ vertical: "top", horizontal: "right" }}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}
		>
			<MenuItem>
			  <FriendRequests username={user.username}/>
			</MenuItem>
			<MenuItem onClick={handleProfileMenuOpen}>
				<IconButton
					aria-label="account of current user"
					aria-controls="primary-search-account-menu"
					aria-haspopup="true"
					color="inherit"
				>
					<Avatar src={`http://127.0.0.1:8000/media/${user.profilePicture}`}/>
				</IconButton>
				<p>Profile</p>
			</MenuItem>
		</Menu>
	)
}

export default MobileMenu
