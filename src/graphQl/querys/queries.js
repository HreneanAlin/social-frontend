import { gql } from "@apollo/client"

export const CURRENT_USER = gql`
	query {
		me {
			username
			verified
			firstName
			lastName
			profilePicture
		}
	}
`

export const USERS_BY_QUERY = gql`
	query UsersByQuery($query: String!) {
		usersByQuery(query: $query) {
			lastName
			firstName
			username
			country
			profilePicture
		}
	}
`

export const USER_BY_USERNAME = gql`
	query UserByUsername($username: String!) {
		userByUsername(username: $username) {
			username
			firstName
			lastName
			country
			profilePicture
			dateJoined
			lastLogin
			postSet {
				id
				text
				title
				date
				postimageSet {
					title
					image
				}
			
			}
		}
	}
`

export const POSTS_BY_USERNAME = gql`
	query PostsByUsername($username: String!) {
		postsByUsername(username: $username) {
			text
			title
			date
			postimageSet {
				title
				image
			}
		}
	}
`
export const MY_POSTS = gql`
	query MyPosts {
		myPosts {
			text
			title
			date
			postimageSet {
				title
				image
			}
		}
	}
`
export const COMMENTS_BY_POST = gql`
	query CommentsByPost($postId: Int!) {
		commentsByPost(postId: $postId) {
			id
			date
			text
			user {
				username
				firstName
				lastName
				profilePicture
			}
		}
	}
`