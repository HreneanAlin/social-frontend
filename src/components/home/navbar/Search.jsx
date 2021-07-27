import {
	Avatar,
	Button,
	IconButton,
	InputBase,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Paper,
} from "@material-ui/core"
import React, { useState } from "react"
import SearchIcon from "@material-ui/icons/Search"
import { useQuery } from "@apollo/client"
import useStyles from "../style"
import { USERS_BY_QUERY } from "../../../graphQl/querys/queries"
import { Link, useRouteMatch, useHistory } from "react-router-dom"
import SendFriendRequest from "./sendFriendRequest/SendFriendRequest"
const Search = () => {
	const [query, setQuery] = useState("")

	const { data } = useQuery(USERS_BY_QUERY, {
		variables: {
			query,
		},
	})
	let { url } = useRouteMatch()
	const classes = useStyles()
	const activate = e => {
		setQuery(e.target.value)
	}
	const history = useHistory()

	const handleRedirectToUser = (url, username) => {
		setQuery("")
		history.push(`${url}/user?username=${username}`)
	}

	return (
		<>
			<Paper className={classes.searchContainer}>
				<InputBase
					className={classes.seachInput}
					placeholder="Search for People"
					onChange={e => activate(e)}
					inputProps={{ "aria-label": "Search for People" }}
				/>
				<Link onClick={() => setQuery("")} to={`${url}/search?q=${query}`}>
					<IconButton className={classes.seachButton} aria-label="search">
						<SearchIcon />
					</IconButton>
				</Link>
				{data?.usersByQuery?.length ? (
					<List className={classes.searchResults}>
						{data.usersByQuery.map(cUser => (
							<ListItem button>
								<ListItemAvatar
									onClick={() => handleRedirectToUser(url, cUser.username)}
								>
									<Avatar
										src={`http://127.0.0.1:8000/media/${cUser.profilePicture}`}
									/>
								</ListItemAvatar>
								<ListItemText
									onClick={() => handleRedirectToUser(url, cUser.username)}
									primary={`${cUser.firstName} ${cUser.lastName}`}
									secondary={`${cUser.username}`}
								/>

								<SendFriendRequest username={cUser.username} />
							</ListItem>
						))}
					</List>
				) : null}
			</Paper>
		</>
	)
}

export default Search
