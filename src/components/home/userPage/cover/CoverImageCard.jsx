import { Avatar, Card, CardMedia } from "@material-ui/core"
import React from "react"

const CoverImageCard = ({classes,coverImage, profilePicture}) => {
	return (
		<Card className={classes.positonRelative}>
			<CardMedia
				className={classes.coverMedia}
				image={`http://127.0.0.1:8000/media/${coverImage}`}
			/>
			<Avatar
				src={`http://127.0.0.1:8000/media/${profilePicture}`}
				className={classes.profileAvatar}
			/>
		</Card>
	)
}

export default CoverImageCard
