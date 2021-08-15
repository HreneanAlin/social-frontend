import { Container, Typography } from '@material-ui/core'
import React from 'react'
import useStyles from "../style"
import NrOfFriendsChart from './NrOfFriendsChart'

const StaffPage = () => {
	const classes = useStyles()

    return (
        <Container maxWidth="lg" classes={classes.marginPage}>
            <Typography classes={classes.userTitle}  variant="h3" align="center">Reports</Typography>
            <Typography classes={classes.userTitle}  variant="h3" align="center">Statistics</Typography>
            <NrOfFriendsChart/>
            
        </Container>
    )
}

export default StaffPage
