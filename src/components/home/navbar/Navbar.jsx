import React from "react"
import {useSelector} from 'react-redux'
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import Typography from "@material-ui/core/Typography"
import InputBase from "@material-ui/core/InputBase"
import Badge from "@material-ui/core/Badge"
import MenuIcon from "@material-ui/icons/Menu"
import AccountCircle from "@material-ui/icons/AccountCircle"
import MailIcon from "@material-ui/icons/Mail"
import NotificationsIcon from "@material-ui/icons/Notifications"
import MoreIcon from "@material-ui/icons/MoreVert"
import useStyles from "../style"
import DesktopMenu from "./DesktopMenu"
import MobileMenu from "./MobileMenu"
import { Avatar, Divider, Paper } from "@material-ui/core"
import Search from "./Search"
import { Link, useHistory } from "react-router-dom"
import FriendRequests from "./friendRequests/FriendRequests"
const Navbar = () => {
	const {user}= useSelector(state=> state.user)
	const [anchorEl, setAnchorEl] = React.useState(null)
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null)
	const classes = useStyles()
	const isMenuOpen = Boolean(anchorEl)
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)
	const history = useHistory()


	const handleProfileMenuOpen = event => {
		setAnchorEl(event.currentTarget)
	}

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null)
	}

	const handleMenuClose = () => {
		setAnchorEl(null)
		handleMobileMenuClose()
	}

	const handleMobileMenuOpen = event => {
		setMobileMoreAnchorEl(event.currentTarget)
	}

	const handleRedirectToUserPage = () => {
		history.push(`/home/user?username=${user.username}`)
   }

	const menuId = "primary-search-account-menu"

	const mobileMenuId = "primary-search-account-menu-mobile"

	return (
		<div className={classes.grow}>
			<AppBar position="fixed">
				<Toolbar>
					<IconButton
						edge="start"
						className={classes.menuButton}
						color="inherit"
						aria-label="open drawer"
					>
						<MenuIcon />
					</IconButton>
					<Typography className={classes.title} variant="h6" noWrap>
						<Link className={classes.maskLink} to="/home"> Face Required</Link>
					</Typography>
					<Search />
					<div className={classes.grow} />
					<div className={classes.sectionDesktop}>
						<IconButton aria-label="show 4 new mails" color="inherit">
							<Badge badgeContent={4} color="secondary">
								<MailIcon />
							</Badge>
						</IconButton>
						<IconButton aria-label="show 17 new notifications" color="inherit">
							<Badge badgeContent={17} color="secondary">
								<NotificationsIcon />
							</Badge>
						</IconButton>
					     <FriendRequests username={user.username}/>
						<IconButton
							edge="end"
							aria-label="account of current user"
							aria-controls={menuId}
							aria-haspopup="true"
							onClick={handleProfileMenuOpen}
							color="inherit"
						>
							<Avatar
								src={`http://127.0.0.1:8000/media/${user.profilePicture}`}
							/>
						</IconButton>
					</div>
					<div className={classes.sectionMobile}>
						<IconButton
							aria-label="show more"
							aria-controls={mobileMenuId}
							aria-haspopup="true"
							onClick={handleMobileMenuOpen}
							color="inherit"
						>
							<MoreIcon />
						</IconButton>
					</div>
				</Toolbar>
			</AppBar>
			<MobileMenu
				mobileMoreAnchorEl={mobileMoreAnchorEl}
				mobileMenuId={mobileMenuId}
				isMobileMenuOpen={isMobileMenuOpen}
				handleMobileMenuClose={handleMobileMenuClose}
				handleProfileMenuOpen={handleProfileMenuOpen}
			/>
			<DesktopMenu
				anchorEl={anchorEl}
				menuId={menuId}
				isMenuOpen={isMenuOpen}
				handleMenuClose={handleMenuClose}
				handleRedirectToUserPage ={handleRedirectToUserPage}
				user = {user}
			/>
		</div>
	)
}

export default Navbar
