import {
	CircularProgress,
	Container,
	Divider,
	Typography,
} from "@material-ui/core"
import React from "react"
import useStyles from "../style"
import { useQuery } from "@apollo/client"
import { GET_ALL_USERS } from "../../../graphQl/querys/queries"

import NrOfFriendsChart from "./NrOfFriendsChart"
import NrUsersRegistered from "./NrUsersRegistered"

const StaffPage = () => {
	const classes = useStyles()
	const { data } = useQuery(GET_ALL_USERS)
	console.log(
		"🚀 ~ file: NrOfFriendsChart.jsx ~ line 9 ~ NrOfFriendsChart ~ data",
		data
	)
	return (
		<Container maxWidth="lg" classes={classes.marginPage}>
			<Typography classes={classes.userTitle} variant="h3" align="center">
				Reports
			</Typography>
			<Typography classes={classes.userTitle} variant="h3" align="center">
				Statistics
			</Typography>
			{data?.getAllUsers?.length ? (
				<>
					<Typography>Nr of friends and declined friends per user:</Typography>
					<NrOfFriendsChart users={data.getAllUsers} />
					<Divider style={{ margin: "1rem 0" }} />
					<Typography gutterBottom>Nr of registrations per day:</Typography>
					<NrUsersRegistered users={data.getAllUsers} />
				</>
			) : (
				<CircularProgress />
			)}
		</Container>
	)
}

export default StaffPage
