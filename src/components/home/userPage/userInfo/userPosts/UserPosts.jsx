import { CircularProgress, Container, Typography } from "@material-ui/core"
import React, { useState } from "react"
import useStyle from "../../../style"
import PostCard from "./PostCard"
import { useSelector } from "react-redux"
import { Waypoint } from "react-waypoint"
import { useQuery } from "@apollo/client"
import queryString from "query-string"

import { POSTS_BY_USERNAME } from "../../../../../graphQl/querys/queries"

const first = 2
const UserPosts = () => {
	const classes = useStyle()
	const { visitator } = useSelector(state => state.visitator)
	const { username } = queryString.parse(window.location.search)
	const { data, loading, fetchMore,networkStatus } = useQuery(POSTS_BY_USERNAME, {
		variables: {
			username,
			first: first,
		},
		notifyOnNetworkStatusChange:true
	})


	return (
		<Container className={classes.postsContainer}>
			{username && fetchMore ? (
				<>
					<Typography variant="h3" align="center" gutterBottom>
						POSTS
					</Typography>

					{data?.postsByUsernamePagination?.postsByUsername?.length ? (
						<>
							{data?.postsByUsernamePagination.postsByUsername
								.map((post, index) => (
									<React.Fragment key={index}>
										<PostCard
											key={post.id}
											post={post}
											user={post.user}
											postDate={post.date}
										/>
										{index ===
											data.postsByUsernamePagination.postsByUsername.length -
												2 && (
											<Waypoint
												onEnter={() =>
													fetchMore({
														variables: {
															username: username,
															first: first,
															skip:
																data.postsByUsernamePagination.postsByUsername
																	.length,
														},
														updateQuery: (pv, { fetchMoreResult }) => {
															if (!fetchMoreResult) {
																return pv
															}
															return {
																postsByUsernamePagination: {
																	_typename: "PostPagination",
																	postsByUsername: [
																		...pv.postsByUsernamePagination
																			.postsByUsername,
																		...fetchMoreResult.postsByUsernamePagination
																			.postsByUsername,
																	],
																	hasNext:
																		fetchMoreResult.postsByUsernamePagination
																			.hasNext,
																},
															}
														},
													})
												}
											/>
										)}
									</React.Fragment>
								))}
								{networkStatus === 3 && <CircularProgress/>}
								{!data?.postsByUsernamePagination?.hasNext && <Typography>No more Posts</Typography>}
						</>
					) : (
						<Typography>{username} has no Posts</Typography>
					)}
				</>
			) : null}
		</Container>
	)
}

export default UserPosts
