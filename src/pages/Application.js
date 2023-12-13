/** @format */
import React, { useState, useEffect } from "react"
import { styled } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import MuiDrawer from "@mui/material/Drawer"
import Box from "@mui/material/Box"
import MuiAppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import List from "@mui/material/List"
import Typography from "@mui/material/Typography"
import Divider from "@mui/material/Divider"
import IconButton from "@mui/material/IconButton"

import MenuIcon from "@mui/icons-material/Menu"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import AccountBoxIcon from "@mui/icons-material/AccountBox"

import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import DashboardIcon from "@mui/icons-material/Dashboard"
import PeopleIcon from "@mui/icons-material/People"
import BarChartIcon from "@mui/icons-material/BarChart"
import LayersIcon from "@mui/icons-material/Layers"

import { Route, Routes } from "react-router"

import Dashboard from "./Dashboard"
import { Container } from "@mui/material"
import Account from "./Account"
import ViewOnlyAccount from "./ViewOnlyAccount"
import { Link, useLocation } from "react-router-dom"
import Assets from "./Assets"

import { capitalize } from "../utils/helperFunctions"
import AssetDetail from "./AssetDetail"
import Advisor from "./Advisor"
import UsersListPage from "../components/Admin/UsersList"
import AdvisorListPage from "../components/Admin/AdvisorList"

import { useSelector, useDispatch } from "react-redux"
import { user_roles } from "../data/constants"

const drawerWidth = 240

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(["width", "margin"], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}))

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
	"& .MuiDrawer-paper": {
		position: "relative",
		whiteSpace: "nowrap",
		width: drawerWidth,
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
		boxSizing: "border-box",
		...(!open && {
			overflowX: "hidden",
			transition: theme.transitions.create("width", {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
			width: theme.spacing(7),
			[theme.breakpoints.up("sm")]: {
				width: theme.spacing(9),
			},
		}),
	},
}))

export default function Application() {
	const [open, setOpen] = React.useState(true)
	const toggleDrawer = () => {
		setOpen(!open)
	}

	const { pathname } = useLocation()
	const [pageName, setPageName] = useState("")

	useEffect(() => {
		const currentPath = pathname.split("/")
		setPageName(currentPath[currentPath?.length - 1])
	}, [pathname])

	const userRole = useSelector((state) => state?.userReducer?.userRole)

	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			<AppBar position='absolute' open={open}>
				<Toolbar
					sx={{
						pr: "24px", // keep right padding when drawer closed
					}}>
					<IconButton
						edge='start'
						color='inherit'
						aria-label='open drawer'
						onClick={toggleDrawer}
						sx={{
							marginRight: "36px",
							...(open && { display: "none" }),
						}}>
						<MenuIcon />
					</IconButton>
					<Typography
						component='h1'
						variant='h6'
						color='inherit'
						noWrap
						sx={{ flexGrow: 1 }}>
						{capitalize(pageName)}
					</Typography>
					<Link to='/app/account'>
						<IconButton color='inherit'>
							<AccountBoxIcon />
							<Typography
								component='h6'
								variant='h6'
								color='inherit'
								noWrap
								sx={{ flexGrow: 1 }}>
								Profile
							</Typography>
						</IconButton>
					</Link>
				</Toolbar>
			</AppBar>
			<Drawer variant='permanent' open={open}>
				<Toolbar
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "flex-end",
						px: [1],
					}}>
					<IconButton onClick={toggleDrawer}>
						<ChevronLeftIcon />
					</IconButton>
				</Toolbar>
				<Divider />
				<List component='nav'>
					<Link to='/app/dashboard'>
						<ListItemButton>
							<ListItemIcon>
								<DashboardIcon />
							</ListItemIcon>
							<ListItemText primary='Dashboard' />
						</ListItemButton>
					</Link>
					<Link to='/app/assets'>
						<ListItemButton>
							<ListItemIcon>
								<LayersIcon />
							</ListItemIcon>
							<ListItemText primary='Assets' />
						</ListItemButton>
					</Link>
					{userRole === user_roles.CLIENT && (
						<Link to='/app/advisor'>
							<ListItemButton>
								<ListItemIcon>
									<PeopleIcon />
								</ListItemIcon>
								<ListItemText primary='Advisor' />
							</ListItemButton>
						</Link>
					)}
					<Divider sx={{ my: 1 }} />
				</List>
			</Drawer>
			<Box
				component='main'
				sx={{
					backgroundColor: (theme) =>
						theme.palette.mode === "light"
							? theme.palette.grey[100]
							: theme.palette.grey[900],
					flexGrow: 1,
					height: "100vh",
					overflow: "auto",
				}}>
				<Toolbar />
				<Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
					<Routes>
						<Route
							path='/dashboard'
							action={({ params }) => {}}
							element={<Dashboard />}
						/>
						<Route
							path='/account'
							action={({ params }) => {}}
							element={<Account />}
						/>
						<Route
							path='/account/:accountId'
							action={({ params }) => {}}
							element={<ViewOnlyAccount />}
						/>
						<Route
							path='/assets'
							action={({ params }) => {}}
							element={<Assets />}
						/>
						<Route
							path='/assets/:assetId'
							action={({ params }) => {}}
							element={<AssetDetail />}
						/>
						<Route
							path='/advisor'
							action={({ params }) => {}}
							element={<Advisor />}
						/>
						<Route
							path='/UsersList'
							action={({ params }) => {}}
							element={<UsersListPage />}
						/>
						<Route
							path='/AdvisorList'
							action={({ params }) => {}}
							element={<AdvisorListPage />}
						/>
					</Routes>
				</Container>
			</Box>
		</Box>
	)
}
