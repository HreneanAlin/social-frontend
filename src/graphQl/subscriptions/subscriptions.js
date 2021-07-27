import { gql } from "@apollo/client"

export const NEW_POST_COMMENT_SUB = gql`
	subscription NewPostComment($postId: Int!) {
		newPostComment(postId: $postId) {
			text
			id
			__typename
		}
	}
`
export const NEW_FRIEND_REQUEST = gql`
	subscription NewFriendRequest($username: String!) {
		newFriendRequest(username: $username) {
			id
			userFrom {
				username
				profilePicture
				firstName
				lastName
				id
			}
			status
		}
	}
`
