import React, { useCallback, useState} from "react"
import CoverImageCard from "./CoverImageCard"
import { useDropzone } from "react-dropzone"
import { useMutation } from "@apollo/client"
import { CHANGE_COVER_IMAGE } from "../../../../graphQl/mutations/mutations"
import { Typography } from "@material-ui/core"

const CoverImageWithUpload = ({ classes, coverImage, profilePicture }) => {
	const [changeCoverImage, { data, loading }] = useMutation(CHANGE_COVER_IMAGE)
	const onDrop = useCallback(acceptedFiles => {
		const file = acceptedFiles[acceptedFiles.length - 1]
		changeCoverImage({
			variables: {
				coverImage: file,
			},
		})
    }, [])
    if(data?.changeCoverImage?.userCoverImage?.coverImage){
        console.log(data)
      //  setCurrentCoverImg(data.changeCoverImage.userCoverImage.coverImage)
    }
	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
	return (
		<div {...getRootProps()}>
			<input {...getInputProps()} />
			<CoverImageCard
				classes={classes}
				coverImage={data?.changeCoverImage?.userCoverImage?.coverImage ? data?.changeCoverImage?.userCoverImage?.coverImage : coverImage}
				profilePicture={profilePicture}
			/>
            {isDragActive &&  <Typography>Drop image to change cover page</Typography>}
		</div>
	)
}

export default CoverImageWithUpload
