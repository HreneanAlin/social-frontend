import { gql } from "@apollo/client"

export const REGISTER_MUTATION = gql`
	mutation RegisterMutation(
		$profilePicture: Upload!
		$email: String!
		$username: String!
		$password1: String!
		$password2: String!
		$firstName: String!
		$lastName: String!
		$country: String!
	) {
		register(
			profilePicture: $profilePicture
			email: $email
			username: $username
			password1: $password1
			password2: $password2
			firstName: $firstName
			lastName: $lastName
			country: $country
		) {
			success
			errors
			token
			refreshToken
		}
	}
`

export const VERIFY_ACCOUNT = gql`
	mutation VerifyAccount($token: String!) {
		verifyAccount(token: $token) {
			success
			errors
		}
	}
`
export const RESEND_EMAIL = gql`
	mutation ResendActivationEmail($email: String!) {
		resendActivationEmail(email: $email) {
			success
			errors
		}
	}
`

export const LOGIN_USER = gql`
	mutation TokenAuth($email: String!, $password: String!) {
		tokenAuth(email: $email, password: $password) {
			success
			errors
			token
			refreshToken
			user {
				username
				isStaff
				lastLogin
				firstName
				lastName
				email
			}
		}
	}
`

export const SEND_PASSWORD_RESET_EMAIL = gql`
	mutation SendPasswordResetEmail($email: String!) {
		sendPasswordResetEmail(email: $email) {
			success
			errors
		}
	}
`

export const PASSWORD_RESET = gql`
	mutation PasswordReset(
		$token: String!
		$password1: String!
		$password2: String!
	) {
		passwordReset(
			token: $token
			newPassword1: $password1
			newPassword2: $password2
		) {
			success
			errors
		}
	}
`

export const REFRESH_TOKEN = gql`
	mutation RefreshToken($refreshToken: String!) {
		refreshToken(refreshToken: $refreshToken) {
			success
			errors
			token
			refreshToken
		}
	}
`

export const LOG_OUT = gql`
	mutation RevokeToken($refreshToken: String!) {
		revokeToken(refreshToken: $refreshToken) {
			success
			errors
		}
	}
`

export const ADD_TEMPORARY_IMAGE = gql`
	mutation AddTemporaryImage($image: Upload!) {
		addImage(image: $image) {
			tempImage {
				id
				image
			}
		}
	}
`

export const ADD_POST = gql`
	mutation AddPost($title: String!, $text: String!, $images: [ImageDescType]!) {
		addPost(title: $title, text: $text, images: $images) {
			success
		}
	}
`

export const ADD_COMMENT_POST = gql`
	mutation AddCommentPost($text: String!, $postId: Int!) {
		addCommentPost(commentText: $text, postId: $postId) {
			success
		}
	}
`

export const SEND_FRIEND_REQUEST = gql`
	mutation SendFriendRequest($username: String!) {
		sendFriendRequest(username: $username) {
			success
		}
	}
`

export const ACCEPT_FRIEND_REQUEST = gql`
	mutation AcceptFriendRequest($friendRequestId: Int!) {
		acceptFriendRequest(friendRequestId: $friendRequestId) {
			success
		}
	}
`
