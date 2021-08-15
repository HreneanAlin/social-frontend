import { CircularProgress } from "@material-ui/core"
import React from "react"
import { useQuery } from "@apollo/client"
import { Bar } from "react-chartjs-2"
import { GET_ALL_USERS } from "../../../graphQl/querys/queries"

const NrOfFriendsChart = () => {
	const { data } = useQuery(GET_ALL_USERS)
	console.log(
		"🚀 ~ file: NrOfFriendsChart.jsx ~ line 9 ~ NrOfFriendsChart ~ data",
		data
	)

	const barChart = (
		<>
			{data?.getAllUsers?.length ? (
				<Bar
					data={{
						labels: data.getAllUsers.map(user => user.username),
						datasets: [
							{
								label: "Friends",
								backgroundColor: "rgba(47, 72, 88, 0.6)",
								data: data.getAllUsers.map(user => user.friends.length),
							},
							{
								label: "Declined",
								backgroundColor: "red",
								data: data.getAllUsers.map(user => user.declinedFriends.length),
							},
						],
					}}
					options={{
					
					}}
					width={100}
					height={50}
				/>
			) : (
				<CircularProgress />
			)}
		</>
	)
	return <div>{barChart}</div>
}

export default NrOfFriendsChart
