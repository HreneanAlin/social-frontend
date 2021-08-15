import { fade, makeStyles } from "@material-ui/core/styles"
const drawerWidth = 240

const useStyles = makeStyles(theme => ({
	paddingPage:{
    paddingTop:theme.spacing(8)
	},
	padding10:{
    paddingTop:"5rem"

	},
	grow: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		display: "none",
		[theme.breakpoints.up("sm")]: {
			display: "block",
		},
	},
	search: {
		position: "relative",
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		"&:hover": {
			backgroundColor: fade(theme.palette.common.white, 0.25),
		},
		marginRight: theme.spacing(2),
		marginLeft: 0,
		width: "100%",
		[theme.breakpoints.up("sm")]: {
			marginLeft: theme.spacing(3),
			width: "auto",
		},
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: "100%",
		position: "absolute",
		pointerEvents: "none",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	inputRoot: {
		color: "inherit",
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("md")]: {
			width: "20ch",
		},
	},
	sectionDesktop: {
		display: "none",
		[theme.breakpoints.up("md")]: {
			display: "flex",
		},
	},
	sectionMobile: {
		display: "flex",
		[theme.breakpoints.up("md")]: {
			display: "none",
		},
	},
	flex: {
		display: "flex",
		gap: theme.spacing(3),
		alignItems: "center",
	},
	links: {
		textDecoration: "none",
		"&:hover": {
			textDecoration: "underline",
		},
	},
	maskLink: {
		textDecoration: "none",
		color: "inherit",
	},

	searchContainer: {
		marginLeft: theme.spacing(2),
		padding: "2px 4px",
		display: "flex",
		alignItems: "center",
		width: 400,
		position: "relative",
	},
	seachInput: {
		marginLeft: theme.spacing(1),
		flex: 1,
	},
	seachButton: {
		padding: 10,
	},
	divider: {
		height: 28,
		margin: 4,
	},
	searchResults: {
		position: "absolute",
		background: "white",
		bottom: 0,
		left: 0,
		right: 0,
		transform: "translateY(98%)",
		borderLeftBottomRadius: theme.spacing(1),
		borderRightBottomRadius: theme.spacing(1),
	},

	searchPageResult: {},
	searchResultItem: {
		backgroundColor: theme.palette.background.paper,
		minHeight: theme.spacing(10),
		marginBottom: theme.spacing(2),
		borderRadius: theme.spacing(2),
		paddingTop: theme.spacing(2),
		paddingBottom: theme.spacing(2),
		boxShadow:
			"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
	},
	avatarLarge: {
		height: theme.spacing(10),
		width: theme.spacing(10),
		marginRight: theme.spacing(4),
	},
	coverMedia: {
		height: theme.spacing(45),
	},
	profileAvatar: {
		minHeight: theme.spacing(25),
		minWidth: theme.spacing(25),
		position: "absolute",
		left: "50%",
		transform: "translateX(-50%) translateY(-80%)",
	},
	positonRelative: {
		position: "relative",
		overflow: "inherit",
	},
	userTitle: {
		marginTop: theme.spacing(6),
	},
	staffTitle: {
		marginTop: "16rem",
	},
	profileContent: {
		paddingTop: "2rem",
	},
	userMenuContainer: {
		width: "100%",
		justifyContent: "center",
		marginBottom: theme.spacing(5)
	},

	mainPage: {
		backgroundColor:"lightgray",
		minHeight:"100vh",
		padding: 0,
	},

	divBtn: {
		display: "flex",
		flexDirection: "column",
	},
	userPage:{
		background: "linear-gradient(to bottom, #d9a7c7, #fffcdc)",
		boxShadow:
			"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
	},
	buttonGroup: {
		display: "grid",
		gridTemplateColumns: "repeat(4,1fr)",

		[theme.breakpoints.down("md")]: {
			gridTemplateColumns: "repeat(1,1fr)",
		},
	},

	postCard: {
		width:"100%",
		marginBottom: theme.spacing(3),
	
	},

	postsContainer: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		
		[theme.breakpoints.up("md")]: {
			padding:theme.spacing(0,30),
		},
	},
	postImageHeader: {
		display: "flex",
		alignItems: "center",
		height: 50,
		paddingLeft: theme.spacing(4),
		backgroundColor: theme.palette.background.default,
	},
	postImg:{
		height: 400,
		display: 'block',
		maxWidth: "100%",
		overflow: 'hidden',
		width: '100%',
	},
	addPostTitle:{
		padding: theme.spacing(2),
		backgroundColor:"darkGray",
		textAlign:"center",
		borderRadius:theme.spacing(999),
		color:"white",
		cursor: "pointer",
		boxShadow:
		"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
	},
	addPostContainer:{
		backgroundColor: theme.palette.background.paper,
		borderRadius:theme.spacing(1),
		marginBottom: theme.spacing(3),
		boxShadow:
		"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
	},
	addPostProfile:{
		width: theme.spacing(10),
		height: theme.spacing(10),
	},
	postInfoContainer:{
		padding:theme.spacing(3,0)
	},
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	  },
	modalContent:{
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
	postTextArea:{
		margin:theme.spacing(1,0),
		width:"100%",
		fontSize: theme.spacing(2),
		padding: theme.spacing(1)
	},
	imagesPreview:{
		display:"grid",
		gridTemplateColumns:"repeat(3,1fr)",
		height:"unset",
		justifyContent: 'space-between',
		[theme.breakpoints.up("md")]: {
			gridTemplateColumns:"repeat(4,1fr)",
		},
	},
	previewAvatar:{
		borderRadius:theme.spacing(1),
		
	},
	postUserInfo:{
		padding: theme.spacing(2),
		display:"flex",
		alignItems: "center",
		gap: theme.spacing(2),
	
	},
	bold:{
		fontWeight:"bold",
	},
	commentSection:{
		width: '100%',
		backgroundColor: theme.palette.background.paper,
		overflow: 'auto',
		maxHeight:225
	},
	comment:{
		display: 'inline',
	},
	addCommentContainer:{
		padding: theme.spacing(1),
		display:"flex",
		gap: theme.spacing(2), 
		alignItems: "center"
	},
	addCommentAvatar:{
		width: theme.spacing(9),
		height: theme.spacing(9)
	},
	addCommentButton:{
		height:theme.spacing(7)
	},
	mainloadingContainer:{
	   display:"grid",
	   height:"100vh",
	   placeItems:"center",
	}
}))

export default useStyles
