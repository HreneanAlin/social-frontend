import { makeStyles } from "@material-ui/core/styles"
const useGeneralStyles = makeStyles(theme => ({
	root: {
        backgroundColor:"red",
        height:"100vh"
	},
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.primary,
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
	padding: {
		paddingLeft: theme.spacing(2),
	},
	paddingBottom1:{
		paddingBottom: theme.spacing(1)
	},
	fullWidth:{
		width:"100%"
	},
	dropzone:{
		width:'100%',
		height:'100px',
		border: "3px dotted black",
		cursor:"pointer",
		display:"flex",
		justifyContent:"center",
		alignItems:"center"
	},
	addIcon:{
		width:"30px",
		height:"30px"
	},
	large: {
		width: theme.spacing(7),
		height: theme.spacing(7),
	  },

	flexCenter:{
		display:"flex",
		alignItems:"center",
		justifyContent:"center",
	} ,

    bgGreen: {
		backgroundColor:"green"
	}
}))

export default useGeneralStyles
