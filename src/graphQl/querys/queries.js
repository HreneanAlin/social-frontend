import { gql } from "@apollo/client"

export const CURRENT_USER = gql`
	query {
		me {
			id
			username
			verified
			firstName
			lastName
			profilePicture
			coverImage
			isStaff
		}
	}
`

export const USERS_BY_QUERY = gql`
	query UsersByQuery($query: String!) {
		usersByQuery(query: $query) {
			id
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
			coverImage
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
			friends {
				id
				username
				firstName
				lastName
				profilePicture
			}
		}
	}
`

export const POSTS_BY_USERNAME = gql`
	query PostsByUsername($username: String!, $first: Int!, $skip: Int) {
		postsByUsernamePagination(username: $username, first: $first, skip: $skip) {
			hasNext
			postsByUsername {
				id
				text
				title
				date
				user {
					id
					firstName
					lastName
					profilePicture
					username
				}
				postimageSet {
					title
					image
				}
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
export const COMMENTS_BY_POST_PAGINATION = gql`
	query CommentsByPostPagination($postId: Int!, $first: Int!, $skip: Int) {
		commentsByPostPagination(postId: $postId, first: $first, skip: $skip) {
			hasNext
			commentsByPost {
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
	}
`

export const MY_FRIEND_REQUESTS = gql`
	query MyFriendRequests {
		myFriendRequests {
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

export const CHECK_USER_RELATION = gql`
	query CheckUserRelation($username: String!) {
		checkUserRelation(username: $username)
	}
`

export const MY_POSTS_AND_FRIENDS = gql`
	query MyPostAndFriendsPagination($first: Int!, $skip: Int) {
		myPostsAndFriendsPagination(first: $first, skip: $skip) {
			hasNext
			postsByUsername {
				id
				text
				title
				date
				user {
					id
					firstName
					lastName
					profilePicture
					username
				}
				postimageSet {
					title
					image
				}
			}
		}
	}
`

export const GET_ALL_USERS = gql`
  query GetAllUsers{
	  getAllUsers{
		  id
		  username
		  dateJoined
		  friends{
			  id
		  }
		  declinedFriends{
			  id
		  }
	  }
  }
`