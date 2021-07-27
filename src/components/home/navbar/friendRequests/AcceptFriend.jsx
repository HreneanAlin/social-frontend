import { IconButton, Tooltip } from "@material-ui/core"
import DoneIcon from '@material-ui/icons/Done';
import React from "react"

const AcceptFriend = () => {
	return (
		<Tooltip title="Accept">
			<IconButton color="primary">
                <DoneIcon/>
            </IconButton>
		</Tooltip>
	)
}

export default AcceptFriend
