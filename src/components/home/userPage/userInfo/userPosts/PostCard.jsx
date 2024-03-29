import {
	Avatar,
	Button,
	Card,
	CardActionArea,
	CardContent,
	MobileStepper,
	Paper,
	Typography,
} from "@material-ui/core"
import React, { useState } from "react"
import useStyle from "../../../style"
import { useTheme } from "@material-ui/core/styles"
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft"
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight"
import { DateTime } from "luxon"
import CommentSection from "./CommentSection"
const PostCard = ({
	post: { id, title, text, postimageSet },
	user,
	postDate,
	ref,
}) => {
	const classes = useStyle()
	const theme = useTheme()
	const maxSteps = postimageSet.length
	const [activeStep, setActiveStep] = useState(0)
	const [, setRender] = useState()
	const handleNext = () => {
		setActiveStep(prevActiveStep => prevActiveStep + 1)
	}

	const handleBack = () => {
		setActiveStep(prevActiveStep => prevActiveStep - 1)
	}
	console.log(postDate)
	return (
		<Card ref={ref} className={classes.postCard}>
			<CardActionArea>
				<div className={classes.postUserInfo}>
					<Avatar src={`http://127.0.0.1:8000/media/${user.profilePicture}`} />
					<Typography className={classes.bold}>
						{user.firstName} {user.lastName}
					</Typography>
					<Typography color="primary">@{user.username}</Typography>
					<Typography>
						{DateTime.fromISO(postDate)
							.setLocale("ro")
							.toLocaleString({
								month: "long",
								day: "numeric",
								hour: "numeric",
								minute: "numeric",
							})}
					</Typography>
				</div>
				{postimageSet?.length ? (
					<>
						<img
							className={classes.postImg}
							src={`http://127.0.0.1:8000/media/${postimageSet[activeStep].image}`}
						/>
						<Paper square elevation={0} className={classes.postImageHeader}>
							<Typography>
								{postimageSet[activeStep].title || "No title"}
							</Typography>
						</Paper>
						<MobileStepper
							steps={maxSteps}
							position="static"
							variant="text"
							activeStep={activeStep}
							nextButton={
								<Button
									size="small"
									onClick={handleNext}
									disabled={activeStep === maxSteps - 1}
								>
									Next
									{theme.direction === "rtl" ? (
										<KeyboardArrowLeft />
									) : (
										<KeyboardArrowRight />
									)}
								</Button>
							}
							backButton={
								<Button
									size="small"
									onClick={handleBack}
									disabled={activeStep === 0}
								>
									{theme.direction === "rtl" ? (
										<KeyboardArrowRight />
									) : (
										<KeyboardArrowLeft />
									)}
									Back
								</Button>
							}
						/>
					</>
				) : null}
			</CardActionArea>
			<CardContent>
				<Typography gutterBottom variant="h5" component="h2">
					{title}
				</Typography>
				<Typography variant="body2" color="textSecondary" component="p">
					{text}
				</Typography>
			</CardContent>
			<CommentSection  id={id} />
		</Card>
	)
}

export default PostCard
