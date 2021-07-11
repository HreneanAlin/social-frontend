import {
	Avatar,
	Divider,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Typography,
} from "@material-ui/core"
import { DateTime } from "luxon"
import React, { useEffect, useState } from "react"
import useStyles from "../../../style"
import { useQuery } from "@apollo/client"
import { COMMENTS_BY_POST } from "../../../../../graphQl/querys/queries"
import AddComment from "./AddComment"
const CommentSection = ({ id,setRender }) => {
	const classes = useStyles()
	
	const { data, refetch } = useQuery(COMMENTS_BY_POST, {
		variables: {
			postId: id,
		},
	})
	 
	useEffect(() =>{},[
		data
	])
	if (data) {
		console.log(data)
	}

	return (
		<>
			{data?.commentsByPost ? (
				<>
					<Divider />
					<List className={classes.commentSection}>
						{data.commentsByPost
							.slice()
							.sort((a, b) => a.id - b.id)
							.map((comment, index) => (
								<React.Fragment key={index}>
									<ListItem alignItems="flex-start">
										<ListItemAvatar>
											<Avatar
												src={`http://127.0.0.1:8000/media/${comment.user.profilePicture}`}
											/>
										</ListItemAvatar>
										<ListItemText
											primary={`${comment.user.firstName} ${comment.user.lastName} at ${DateTime.fromISO(comment.date)
												.setLocale("ro")
												.toLocaleString({
													month: "long",
													day: "numeric",
													hour: "numeric",
													minute: "numeric",
												})}  `}
											secondary={
												<>
													<Typography
														component="span"
														variant="body2"
														className={classes.comment}
														color="textPrimary"
													>
														{comment.text}
													</Typography>
												</>
											}
										/>
									</ListItem>
									{data.commentsByPost.length - 1 === index ? null : (
										<Divider variant="inset" component="li" />
									)}
								</React.Fragment>
							))}
					</List>
				</>
			) : null}
			 <AddComment setRender={setRender} loadComments={refetch}  id={id}/>
		</>
	)
}

export default CommentSection
