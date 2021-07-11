import {
	Avatar,
	BottomNavigation,
	BottomNavigationAction,
	TextField,
} from "@material-ui/core"
import React, { useState, useRef } from "react"
import useStyles from "../../style"

const ImagesPreview = ({
	imagesArray,
	filesToBeSend,
	setFilesToBeSend,
	
}) => {

	const [value, setValue] = useState(0)
	const [description, setDescription] = useState("")
	const classes = useStyles()
	const inputDescription = useRef()
	const handleDescriptionChange = e => {
		filesToBeSend[value].description = e.target.value
		setFilesToBeSend(previus => filesToBeSend)
		setDescription(e.target.value)
	}

	return (
		<>
			<BottomNavigation
				className={classes.imagesPreview}
				value={value}
				onChange={(event, newValue) => {
					setValue(previus => newValue)
					const currentInput = inputDescription.current.getElementsByTagName(
						"input"
					)[0]

					currentInput.value = ""
				}}
				showLabels
			>
				{imagesArray.map((imagePath, index) => (
					<BottomNavigationAction
						key={imagePath.addImage.tempImage.id}
						label={
							filesToBeSend[index]?.description
								? filesToBeSend[index].description.length > 9 ? `${filesToBeSend[index].description.substring(0,8)}...` : filesToBeSend[index].description
								: `image ${index + 1}`
						}
						icon={
							<Avatar
								className={classes.previewAvatar}
								src={`http://127.0.0.1:8000/media/${imagePath.addImage.tempImage.image}`}
							/>
						}
					/>
				))}
			</BottomNavigation>
			<TextField
				variant="outlined"
				fullWidth
				label="Photo description"
				onChange={e => handleDescriptionChange(e)}
				ref={inputDescription}
			/>
		</>
	)
}

export default ImagesPreview
