import { Avatar, Badge, IconButton, Menu, MenuItem } from "@material-ui/core"
import {useSelector} from 'react-redux'
import MailIcon from "@material-ui/icons/Mail"
import NotificationsIcon from "@material-ui/icons/Notifications"
import AccountCircle from "@material-ui/icons/AccountCircle"
import React from "react"

const MobileMenu = ({
	mobileMoreAnchorEl,
	mobileMenuId,
	isMobileMenuOpen,
	handleMobileMenuClose,
	handleProfileMenuOpen,
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
				<IconButton aria-label="show 4 new mails" color="inherit">
					<Badge badgeContent={4} color="secondary">
						<MailIcon />
					</Badge>
				</IconButton>
				<p>Messages</p>
			</MenuItem>
			<MenuItem>
				<IconButton aria-label="show 11 new notifications" color="inherit">
					<Badge badgeContent={11} color="secondary">
						<NotificationsIcon />
					</Badge>
				</IconButton>
				<p>Notifications</p>
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
