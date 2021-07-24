import {
	Avatar,
	CircularProgress,
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
import { useQuery, useSubscription, } from "@apollo/client"
import { COMMENTS_BY_POST_PAGINATION } from "../../../../../graphQl/querys/queries"
import { Waypoint } from "react-waypoint"
import AddComment from "./AddComment"
import { NEW_POST_COMMENT_SUB } from "../../../../../graphQl/subscriptions/subscriptions"
const CommentSection = ({ id, setRender }) => {
	const classes = useStyles()
	const { data, fetchMore, networkStatus, subscribeToMore } = useQuery(
		COMMENTS_BY_POST_PAGINATION,
		{
			variables: {
				postId: id,
				first: 4,
			},
			notifyOnNetworkStatusChange: true,
		}
	)

useEffect(() => {
	subscribeToMore({
		document:NEW_POST_COMMENT_SUB,
		variables:{
			postId: id,
		},
		updateQuery:(prev,{subscriptionData}) =>{
			if(!subscriptionData.data) return prev;
			const newItem = subscriptionData.data.newPostComment
			return {
				commentsByPostPagination: {
					_typename: "CommentPagination",
					commentsByPost: [
						newItem,
						...prev.commentsByPostPagination.commentsByPost,
					],
					hasNext: prev.commentsByPostPagination.hasNext,
				},
			}
		}
	})
},[subscribeToMore])
	
	const handlePagination = () => {
		fetchMore({
			variables: {
				postId: id,
				first: 4,
				skip: data.commentsByPostPagination.commentsByPost.length,
			},
			updateQuery: (pv, { fetchMoreResult }) => {
				if (!fetchMoreResult) {
					return pv
				}
				return {
					commentsByPostPagination: {
						_typename: "CommentPagination",
						commentsByPost: [
							...pv.commentsByPostPagination.commentsByPost,
							...fetchMoreResult.commentsByPostPagination.commentsByPost,
						],
						hasNext: fetchMoreResult.commentsByPostPagination.hasNext,
					},
				}
			},
		})
	}

	return (
		<>
			{data?.commentsByPostPagination?.commentsByPost ? (
				<>
					<Divider />
					<List className={classes.commentSection}>
						{data.commentsByPostPagination.commentsByPost.map(
							(comment, index) => (
								<React.Fragment key={index}>
									<ListItem alignItems="flex-start">
										<ListItemAvatar>
											<Avatar
												src={`http://127.0.0.1:8000/media/${comment.user.profilePicture}`}
											/>
										</ListItemAvatar>
										<ListItemText
											primary={`${comment.user.firstName} ${
												comment.user.lastName
											} at ${DateTime.fromISO(comment.date)
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
									{index ===
										data.commentsByPostPagination.commentsByPost.length - 2 && (
										<Waypoint onEnter={() => handlePagination()} />
									)}
									{data.commentsByPostPagination.commentsByPost.length - 1 ===
									index ? null : (
										<Divider variant="inset" component="li" />
									)}
								</React.Fragment>
							)
						)}
					</List>
					{networkStatus === 3 && <CircularProgress />}
				</>
			) : null}
			<AddComment setRender={setRender} fetchMoreComments={fetchMore} id={id} />
		</>
	)
}

export default CommentSection
