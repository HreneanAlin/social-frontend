import { IconButton, Tooltip } from "@material-ui/core"
import React from "react"
import HowToRegIcon from "@material-ui/icons/HowToReg"
import RecordVoiceOverIcon from "@material-ui/icons/RecordVoiceOver"
import PersonAddDisabledIcon from "@material-ui/icons/PersonAddDisabled"
import SendIcon from "@material-ui/icons/Send"
import SendFriendRequest from "../sendFriendRequest/SendFriendRequest"

const UserIconType = ({ checkUserRelation, username}) => {
	return checkUserRelation === "A" || checkUserRelation === "MA" ? (
		<Tooltip title="friend">
			<IconButton>
				<HowToRegIcon color="primary" />
			</IconButton>
		</Tooltip>
	) : checkUserRelation === "MP" ? (
		<Tooltip title="request send">
			<IconButton>
				<SendIcon color="primary" />
			</IconButton>
		</Tooltip>
	) : checkUserRelation === "P" ? (
		<Tooltip title="pending request">
			<IconButton>
				<RecordVoiceOverIcon color="primary" />
			</IconButton>
		</Tooltip>
	) : checkUserRelation === "D" || checkUserRelation === "MD" ? (
		<Tooltip title="rejection">
			<IconButton>
				<PersonAddDisabledIcon color="primary" />
			</IconButton>
		</Tooltip>
	) : (
		<SendFriendRequest username={username} />
	)
}

export default UserIconType
