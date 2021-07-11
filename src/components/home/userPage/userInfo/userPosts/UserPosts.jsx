import { Container, Typography } from "@material-ui/core"
import React from "react"
import useStyle from "../../../style"
import PostCard from "./PostCard"
import { useSelector } from "react-redux"

const UserPosts = () => {
	const classes = useStyle()
	const { visitator } = useSelector(state => state.visitator)
	console.log(
		"🚀 ~ file: UserPosts.jsx ~ line 14 ~ UserPosts ~ visitator",
		visitator
	)

	return (
		<Container className={classes.postsContainer}>
			{visitator?.username ? (
				<>
					<Typography variant="h3" align="center" gutterBottom>
						POSTS
					</Typography>
					{visitator.postSet?.length ? (
						<>
							{visitator.postSet
								.slice()
								.sort((prev, next) => next.id - prev.id)
								.map(post => (
									<PostCard
										key={post.id}
										post={post}
										user={visitator}
										postDate={post.date}
									/>
								))}
						</>
					) : (
						<Typography>{visitator.username} has no Posts</Typography>
					)}
				</>
			) : null}
		</Container>
	)
}

export default UserPosts
