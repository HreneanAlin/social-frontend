import React, { useState, useEffect } from "react"
import { RESEND_EMAIL } from "../../graphQl/mutations/mutations"
import { useMutation } from "@apollo/client"
import { printErrors } from "../../helpers/helpers"
import { Typography } from "@material-ui/core"
const ResendActivation = ({ email, resend }) => {
	const [reSendEmail, { data, error, loading }] = useMutation(RESEND_EMAIL)
	useEffect(() => {
		reSendEmail({
			variables: {
				email,
			},
		})
	}, [resend])
	if (loading) return <p>Loading...</p>
	if (data?.resendActivationEmail?.success)
		return <> 
		<Typography variant="body1" align="center">We have send you an email again</Typography>
		
		</>
		//todo resent again
	return (
		<div>{data?.resendActivationEmail?.errors ? printErrors(data.resendActivationEmail.errors): <p>Loading...</p>}</div>
	)
}

export default ResendActivation
