import { Avatar, Typography } from '@material-ui/core'
import React,{useCallback} from 'react'
import { useDropzone } from "react-dropzone"
import AddIcon from "@material-ui/icons/Add"
import useGeneralStyles from "../../generalStyle"
import { useMutation } from "@apollo/client"
import { ADD_TEMPORARY_IMAGE } from '../../graphQl/mutations/mutations'

const ImageUpload = ({profilePic,setProfilePic}) => {
    const [addTemporaryImage, { data, error, loading }] = useMutation(ADD_TEMPORARY_IMAGE)
    const generalClasses = useGeneralStyles()
    const onDrop = useCallback(acceptedFiles => {
      const file =  acceptedFiles[acceptedFiles.length-1]  
      setProfilePic(file)
      addTemporaryImage({
          variables:{
              image:file
          }
      })
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <div {...getRootProps()}>
        <input  {...getInputProps()} />
        <div className={generalClasses.dropzone}>
            {data?.addImage?.tempImage?.image ? (
                <Avatar className={generalClasses.large} src={`http://127.0.0.1:8000/media/${data.addImage.tempImage.image}`} />
            ) : (
                <>
                    {isDragActive ? (
                        <>
                            <Typography>Drop image here...</Typography>
                        </>
                    ) : (
                        <>
                            <AddIcon className={generalClasses.addIcon} />
                        </>
                    )}
                </>
            )}
        </div>
    </div>
    )
}

export default ImageUpload
