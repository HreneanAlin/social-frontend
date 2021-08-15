import { Menu, MenuItem } from "@material-ui/core"
import { Link, useHistory } from "react-router-dom"
import React from "react"
import useStyles from "../style"

const DesktopMenu = ({
	anchorEl,
	menuId,
	isMenuOpen,
	handleMenuClose,
	handleRedirectToUserPage,
	handleRedirectToStatistics,
	user,
}) => {
	const classes = useStyles()

	return (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{ vertical: "top", horizontal: "right" }}
			id={menuId}
			keepMounted
			transformOrigin={{ vertical: "top", horizontal: "right" }}
			open={isMenuOpen}
			onClose={handleMenuClose}
		>
			<MenuItem onClick={handleRedirectToUserPage}>Profile</MenuItem>
			{user.isStaff && (
				<MenuItem onClick={handleRedirectToStatistics}>Statistics</MenuItem>
			)}
			<MenuItem>
				<Link className={classes.maskLink} to="/logout">
					Log Out
				</Link>
			</MenuItem>
		</Menu>
	)
}

export default DesktopMenu
