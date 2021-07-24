import { Avatar, Button, TextField } from "@material-ui/core"

import SendIcon from "@material-ui/icons/Send"
import React, { useState, useRef } from "react"
import { useSelector } from "react-redux"
import { useMutation } from "@apollo/client"
import useStyles from "../../../style"
import { ADD_COMMENT_POST } from "../../../../../graphQl/mutations/mutations"
import { COMMENTS_BY_POST_PAGINATION, CURRENT_USER } from "../../../../../graphQl/querys/queries"
const AddComment = ({ id, fetchMoreComments, setRender }) => {
	const { user } = useSelector(state => state.user)
	const [commentText, setCommentText] = useState()
	const [addComment] = useMutation(ADD_COMMENT_POST)
	const commentEl = useRef()
	const classes = useStyles()
	const prepareMessage = e => {
		if (!commentText) return
		addComment({
			variables: {
				text: commentText,
				postId: id,
            },
            // update:(store,{data})=>{
            //     const commentData = store.readQuery({query:COMMENTS_BY_POST_PAGINATION,returnPartialData:true})
            //     console.log("🚀 ~ file: AddComment.jsx ~ line 25 ~ AddComment ~ commentData", commentData)
            //     store.writeQuery({
            //         query:COMMENTS_BY_POST_PAGINATION,
            //         data:{
            //             commentsByPostPagination:{
            //                 _typename: "CommentPagination",
            //                 commentsByPost:[data.addComment,...commentData.commentsByPostPagination.commentsByPost],
            //                 hasNext: commentData.commentsByPostPagination.hasNext
            //             }
            //         }
            //     })
            // }
		})
		const currentInput = commentEl.current.getElementsByTagName("input")[0]
		currentInput.value = ""
		setRender(true)
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
