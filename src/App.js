/** @format */
import React, { useEffect } from "react"

import { Typography } from "@mui/material"
import { Link } from "react-router-dom"

import SignUp from "./pages/Signup"
import Signin from "./pages/Signin"
import Application from "./pages/Application"

import theme from "./MUItheme/theme"
import { ThemeProvider } from "@mui/material/styles"
import { BrowserRouter, Redirect } from "react-router-dom"
import { Routes, Route, Navigate } from "react-router"
import Home from "./pages/Home"

import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"

// Snackbar for success and error messages
import Snackbar from "@mui/material/Snackbar"
import MuiAlert from "@mui/material/Alert"

import { useSelector, useDispatch } from "react-redux"
import { closeNotification } from "./store/notificationReducer"
import { setAuthenticated } from "./store/userReducer"

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

function Copyright(props) {
	return (
		<Typography
			variant='body2'
			color='text.secondary'
			align='center'
			{...props}>
			{"Copyright © Asset Blend "}

			{/* <Link color='inherit' href=''>
				Asset Blend
			</Link>{" "} */}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	)
}

function App() {
	const dispatch = useDispatch()
	const notificationDetails = useSelector(
		(state) => state?.notificationReducer?.alert
	)

	const isUserAuthenticated = useSelector(
		(state) => state?.userReducer?.isAuthenticated
	)

	const handleClose = (event, r) => dispatch(closeNotification())

	// Check if the user is authenticated
	useEffect(() => {
		const accessToken = sessionStorage.getItem("accessToken")
		if (accessToken) {
			dispatch(setAuthenticated(true))
		}
	}, [])

	return (
		<ThemeProvider theme={theme}>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<BrowserRouter>
					<div className='App'>
						<Routes>
							<Route
								exact
								path='/'
								action={({ params }) => {}}
								element={<Home />}
							/>
							<Route
								exact
								path='/signin'
								action={({ params }) => {}}
								element={<Signin />}
							/>
							<Route
								exact
								path='/signup'
								action={({ params }) => {}}
								element={<SignUp />}
							/>

							{isUserAuthenticated ? (
								<Route
									path='/app/*'
									action={({ params }) => {}}
									element={<Application />}
								/>
							) : (
								<Route
									path='*'
									action={({ params }) => {}}
									element={<Signin />}
								/>
							)}
						</Routes>

						<Snackbar
							open={notificationDetails.open}
							autoHideDuration={4000}
							onClose={handleClose}>
							<Alert
								onClose={handleClose}
								severity={notificationDetails.severity}
								sx={{ width: "100%" }}>
								{notificationDetails.message}
							</Alert>
						</Snackbar>
						{/* <div className='Footer'>
						<Copyright />
					</div> */}
					</div>
				</BrowserRouter>
			</LocalizationProvider>
		</ThemeProvider>
	)
}

export default App
