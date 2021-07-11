import { makeStyles } from "@material-ui/core/styles"
const useStyles = makeStyles(theme => ({
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		// Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	links: {
		textDecoration: "none",
		"&:hover": {
			textDecoration: "underline",
		},
  },
  padding:{
    paddingLeft: theme.spacing(2)
  }
}))

export default useStyles
