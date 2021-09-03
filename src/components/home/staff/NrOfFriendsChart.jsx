import { CircularProgress } from "@material-ui/core"
import React from "react"
import { Bar } from "react-chartjs-2"

const NrOfFriendsChart = ({ users }) => {
	const barChart = (
		<>
			{users?.length ? (
				<Bar
					data={{
						labels: users.map(user => user.username),
						datasets: [
							{
								label: "Friends",
								backgroundColor: "rgba(47, 72, 88, 0.6)",
								data: users.map(user => user.friends.length),
							},
							{
								label: "Declined",
								backgroundColor: "red",
								data: users.map(user => user.declinedFriends.length),
							},
						],
					}}
					options={{
						indexAxis: "y",
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
