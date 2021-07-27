import { IconButton, Tooltip } from "@material-ui/core"
import CloseIcon from "@material-ui/icons/Close"

import React from "react"

const DeclineFriend = () => {
	return (
		<Tooltip title="Decline">
			<IconButton>
				<CloseIcon />
			</IconButton>
		</Tooltip>
	)
}

export default DeclineFriend
