import {
	Avatar,
	Button,
	Container,
	Grid,
	List,
	ListItem,
	ListItemAvatar,
	ListItemSecondaryAction,
	Typography,
} from "@material-ui/core"
import React from "react"
import queryString from "query-string"
import { useQuery } from "@apollo/client"
import { Link } from "react-router-dom"
import useStyles from "../style"
import { USERS_BY_QUERY } from "../../../graphQl/querys/queries"
import ExtendedFoundUser from "./ExtendedFoundUser"
const SearchPage = () => {
	const classes = useStyles()
	const { q } = queryString.parse(window.location.search)

	const { data } = useQuery(USERS_BY_QUERY, {
		variables: {
			query: q,
		},
	})

	return (
		<Container className={classes.marginPage} dense>
			<Typography variant="h4" gutterBottom>
				The results for: {q}
			</Typography>
			{data?.usersByQuery?.length ? (
				<>
					<List dense className={classes.searchPageResult}>
						{data.usersByQuery.map(cUser => (
							<ExtendedFoundUser
								key={cUser.id}
								cUser={cUser}
								classes={classes}
							/>
						))}
					</List>
				</>
			) : null}
		</Container>
	)
}

export default SearchPage
