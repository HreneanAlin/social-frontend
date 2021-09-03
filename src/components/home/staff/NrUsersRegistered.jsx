import { CircularProgress } from "@material-ui/core"
import React from "react"
import { Line } from "react-chartjs-2"

const groupBy = (array, key) => {
	return array.reduce((result, currentValue) => {
		;(result[currentValue[key]] = result[currentValue[key]] || []).push(
			currentValue
		)

		return result
	}, {})
}
const NrUsersRegistered = ({ users }) => {
	const formatedUsers = users.map(user => ({
		...user,
		dateJoined: user.dateJoined.substring(0, 10),
	}))

	const groupedUsers = groupBy(formatedUsers, "dateJoined")
	console.log(
		"🚀 ~ file: NrUsersRegistered.jsx ~ line 21 ~ NrUsersRegistered ~  groupedUsers",
		groupedUsers
	)

	const lineChart = (
		<Line
			data={{
				labels: Object.keys(groupedUsers),
				datasets: [
					{
						label: "registrations",
						backgroundColor: "blue",
						data: Object.values(groupedUsers).map(group => group.length),
					},
				],
			}}
			options={{
				plugins: {
					legend: {
						display: false,
                    },
                
                },
                
			}}
			width={100}
			height={50}
		/>
	)
	return <div>{lineChart}</div>
}

export default NrUsersRegistered
