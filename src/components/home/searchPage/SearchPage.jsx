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
import { Link} from "react-router-dom"
import useStyles from "../style"
import { USERS_BY_QUERY } from "../../../graphQl/querys/queries"
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
							<Link
							 key={cUser.username}
							 className={classes.maskLink}
							 to={`user?username=${cUser.username}`}
							>
							<ListItem className={classes.searchResultItem} button>
								<ListItemAvatar>
									<Avatar
										className={classes.avatarLarge}
										src={`http://127.0.0.1:8000/media/${cUser.profilePicture}`}
									/>
								</ListItemAvatar>
								<Grid container>
									<Grid item xs={12} md={12} lg={3}>
										<Typography variant="h5">
											{cUser.firstName} {cUser.lastName} 
										</Typography>
									</Grid>
									<Grid
										item
										container
										xs={12}
										md={6}
										lg={3}
										alignContent="flex-end"
									>
										<Typography variant="body1" color="textSecondary">
											{cUser.username}
										</Typography>
									</Grid>
									<Grid
										item
										container
										xs={12}
										md={6}
										lg={3}
										alignContent="flex-end"
									>
										<Typography variant="body1" color="textSecondary">
											lives in: {cUser.country}
										</Typography>
									</Grid>
								</Grid>

								<ListItemSecondaryAction>
									<Button variant="contained" color="primary">
										Add friend
									</Button>
								</ListItemSecondaryAction>
							</ListItem>
							</Link>
						))}
					</List>
				</>
			) : null}
		</Container>
	)
}

export default SearchPage
