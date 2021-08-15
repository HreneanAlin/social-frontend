import { Avatar, TextField } from "@material-ui/core"
import React, { useState, useRef } from "react"
import { useSelector } from "react-redux"
import { useMutation } from "@apollo/client"
import useStyles from "../../../style"
import { ADD_COMMENT_POST } from "../../../../../graphQl/mutations/mutations"

const AddComment = ({ id }) => {
	const { user } = useSelector(state => state.user)
	const [commentText, setCommentText] = useState()
	const [addComment] = useMutation(ADD_COMMENT_POST)
	const commentEl = useRef()
	const classes = useStyles()
	const prepareMessage = () => {
		if (!commentText) return
		addComment({
			variables: {
				text: commentText,
				postId: id,
            },
		})
		const currentInput = commentEl.current.getElementsByTagName("input")[0]
		currentInput.value = ""
	}

	return (
		<div className={classes.addCommentContainer}>
			<Avatar
				className={classes.addCommentAvatar}
				src={`http://127.0.0.1:8000/media/${user.profilePicture}`}
			/>
			<TextField
				ref={commentEl}
				variant="outlined"
				fullWidth
				placeholder="add a comment"
				onChange={e => setCommentText(e.target.value)}
				onKeyPress={e =>
					e.key === "Enter" ? (e.target.value ? prepareMessage(e) : null) : null
				}
			/>
		</div>
	)
}

export default AddComment
