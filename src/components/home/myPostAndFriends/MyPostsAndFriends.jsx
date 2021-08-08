import { CircularProgress, Container, Typography } from "@material-ui/core"
import React from "react"
import useStyles from "../../../generalStyle"
import { useQuery } from "@apollo/client"
import { MY_POSTS_AND_FRIENDS } from "../../../graphQl/querys/queries"
import PostCard from "../userPage/userInfo/userPosts/PostCard"
import { Waypoint } from "react-waypoint"

const first = 2
const MyPostsAndFriends = () => {
	const classes = useStyles()
	const { data, loading, fetchMore, networkStatus } = useQuery(
		MY_POSTS_AND_FRIENDS,
		{
			variables: {
				first,
			},
			notifyOnNetworkStatusChange: true,
		}
	)
	console.log(data)
	const handlePagination = () => {
		fetchMore({
			variables: {
				first,
				skip: data.myPostsAndFriendsPagination.postsByUsername.length,
			},
			updateQuery: (pv, { fetchMoreResult }) => {
				if (!fetchMoreResult) {
					return pv
				}
				return {
					myPostsAndFriendsPagination: {
						_typename: "PostPagination",
						postsByUsername: [
							...pv.myPostsAndFriendsPagination.postsByUsername,
							...fetchMoreResult.myPostsAndFriendsPagination.postsByUsername,
						],
						hasNext: fetchMoreResult.myPostsAndFriendsPagination.hasNext,
					},
				}
			},
		})
	}
	return (
		<Container className={classes.postsContainer}>
			{data?.myPostsAndFriendsPagination?.postsByUsername?.length ? (
				<>
					{data.myPostsAndFriendsPagination.postsByUsername.map(
						(post, index) => (
							<React.Fragment key={index}>
								<PostCard
									key={post.id}
									post={post}
									user={post.user}
									postDate={post.date}
								/>
								{index ===
									data.myPostsAndFriendsPagination.postsByUsername.length -
										2 && <Waypoint onEnter={handlePagination} />}
							</React.Fragment>
						)
					)}
					{networkStatus === 3 && <CircularProgress />}
					{!data?.myPostsAndFriendsPagination?.hasNext && (
						<Typography>No more Posts</Typography>
					)}
				</>
			) : (
				<Typography>no posts to show</Typography>
			)}
		</Container>
	)
}

export default MyPostsAndFriends
