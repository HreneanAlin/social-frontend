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
