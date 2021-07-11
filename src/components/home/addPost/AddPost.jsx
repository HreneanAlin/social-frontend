import {
	Avatar,
	Backdrop,
	Button,
	Container,
	Fade,
	Grid,
	Modal,
	TextareaAutosize,
	TextField,
	Typography,
} from "@material-ui/core"
import React, { useState, useCallback, useEffect } from "react"
import classNames from "classname"
import useStyles from "../style"
import { useSelector } from "react-redux"
import { useDropzone } from "react-dropzone"
import { useMutation } from "@apollo/client"
import { Redirect } from "react-router-dom"
import {
	ADD_POST,
	ADD_TEMPORARY_IMAGE,
} from "../../../graphQl/mutations/mutations"
import ImagesPreview from "./imagesPreview/ImagesPreview"
const AddPost = () => {
	const classes = useStyles()
	const { user } = useSelector(state => state.user)
	const [open, setOpen] = useState(false)
	const [temporaryImages, setTemporaryImages] = useState([])
	const [temporaryImagesFiles, setTemporaryImagesFiles] = useState([])
	const [title, setTitle] = useState("")
	const [text, setText] = useState("")
	const [addTemporaryImage, { data, error, loading }] = useMutation(
		ADD_TEMPORARY_IMAGE
	)
	const [
		addPost,
		{ data: postData, error: postError, loading: postLoading },
		client,
	] = useMutation(ADD_POST)

	const onDrop = useCallback(acceptedFiles => {
		acceptedFiles.forEach(file => {
			addTemporaryImage({
				variables: {
					image: file,
				},
			})
			setTemporaryImagesFiles(previous => [
				...previous,
				{
					description: "",
					file: file,
				},
			])
		})
	}, [])

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		noClick: true,
	})

	useEffect(() => {
		if (data) {
			setTemporaryImages(previous => [...previous, data])
		}
	}, [data])

	const handleOpen = () => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
		window.location.replace("/home")
	}
	const handleSubmit = e => {
		e.preventDefault()
		addPost({
			variables: {
				title,
				text,
				images: temporaryImagesFiles,
			},
		})
		e.target.reset()
	}
	if (postData?.addPost?.success) {
		return <Redirect to="/"/>
	}

	return (
		<Container
			className={classNames(classes.paddingPage, classes.addPostContainer)}
		>
			<Grid container className={classes.postInfoContainer}>
				<Grid item xs={12} md={2}>
					<Avatar
						className={classes.addPostProfile}
						src={`http://127.0.0.1:8000/media/${user.profilePicture}`}
					/>
				</Grid>
				<Grid item xs={12} md={10}>
					<Typography
						onClick={handleOpen}
						variant="h4"
						className={classes.addPostTitle}
					>
						What's on your mind, {user.firstName}? Create a post!
					</Typography>
				</Grid>
			</Grid>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				className={classes.modal}
				open={open}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={open}>
					<div className={classes.modalContent} {...getRootProps()}>
						<Typography>You can drag images</Typography>
						<form method="post" onSubmit={e => handleSubmit(e)}>
							<input {...getInputProps()} />
							<TextField
								variant="outlined"
								required
								fullWidth
								id="title"
								label="Title"
								name="title"
								onChange={e => setTitle(e.target.value)}
							/>
							<TextareaAutosize
								required
								className={classes.postTextArea}
								placeholder="Write your post here"
								rowsMin={4}
								onChange={e => setText(e.target.value)}
							></TextareaAutosize>
							{temporaryImages.length ? (
								<>
									<ImagesPreview
										imagesArray={temporaryImages}
										filesToBeSend={temporaryImagesFiles}
										setFilesToBeSend={setTemporaryImagesFiles}
									/>
								</>
							) : null}
							<Button
								type="submit"
								fullWidth
								variant="contained"
								color="primary"
							>
								Create Post
							</Button>
						</form>
					</div>
				</Fade>
			</Modal>
		</Container>
	)
}

export default AddPost
