import React from "react";
import { Link } from "react-router-dom";

// Components
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import InputBase from "@material-ui/core/InputBase";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Typography from "@material-ui/core/Typography";
import { makeStyles, withStyles } from "@material-ui/core/styles";

// icons
import NotificationsNone from "@material-ui/icons/NotificationsNone";
import ChatBubbleOutline from "@material-ui/icons/ChatBubbleOutline";
import PowerSettingsNew from "@material-ui/icons/PowerSettingsNew";
import Search from "@material-ui/icons/Search";

// imports
import LightTooltip from "../commonComponents/LightTooltip";

const useStyles = makeStyles((theme) => ({
	appbarControls: {
		marginLeft: "auto",
	},
	searchInput: {
		transition: "background-color .3s",
		borderRadius: 3,
		minWidth: 200,

		"&:hover": {
			backgroundColor: "rgba(255,255,255,0.75)",
		},
	},
	inputAdornment: {
		padding: "0 5px",
	},
	toolBar: {
		maxWidth: "100vw",
		overflowX: "auto",

		"& .MuiIconButton-root": {
			color: "inherit",
		},
	},
	linksWrapper: {
		color: theme.palette.common.black,
		marginLeft: 30,

		"& > a": {
			color: "inherit",
			textDecoration: "none",
			marginRight: 15,

			"&:hover": {
				color: theme.palette.warning.dark,
			},
		},
	},
}));

export default function AppHeader() {
	const classes = useStyles();

	const searchInputAdornment = (
		<InputAdornment className={classes.inputAdornment} position="start">
			<Search color="disabled" />
		</InputAdornment>
	);

	return (
		<AppBar position="relative" color="default" id="app-header">
			<Toolbar className={classes.toolBar}>
				<InputBase
					classes={{ root: classes.searchInput }}
					startAdornment={searchInputAdornment}
					placeholder="Search Here"
				/>
				<div className="header-sec">
					<Typography className={classes.linksWrapper}>
						<Link to="/employees">Employees</Link>
						<Link to="/admins">Admins</Link>
					</Typography>
					<Toolbar className={classes.appbarControls} disableGutters>
						<LightTooltip title="All Notification" placement="left">
							<IconButton>
								<Badge color="secondary" overlap="circle" badgeContent={3} variant="dot">
									<NotificationsNone />
								</Badge>
							</IconButton>
						</LightTooltip>
						<LightTooltip title="All Messages" withArrow>
							<IconButton>
								<Badge color="primary" overlap="circle" badgeContent={23} max={20} variant="dot">
									<ChatBubbleOutline style={{ fontSize: "1.35rem" }} />
								</Badge>
							</IconButton>
						</LightTooltip>
						<LightTooltip title="Logout" placement="bottom" withArrow>
							<IconButton>
								<PowerSettingsNew style={{ fontSize: "1.35rem", marginBottom: 3 }} />
							</IconButton>
						</LightTooltip>
					</Toolbar>
				</div>
			</Toolbar>
		</AppBar>
	);
}
