/** @format */
import { Typography } from "@mui/material"
import { Link } from "react-router-dom"

import SignUp from "./pages/Signup"
import Signin from "./pages/Signin"
import Application from "./pages/Application"

import theme from "./MUItheme/theme"
import { ThemeProvider } from "@mui/material/styles"
import { BrowserRouter } from "react-router-dom"
import { Routes, Route, Navigate } from "react-router"

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
	return (
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<div className='App'>
					<Routes>
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
						<Route
							exact
							path='/app/*'
							action={({ params }) => {}}
							element={<Application />}
						/>
					</Routes>
					<div className='Footer'>
						<Copyright />
					</div>
				</div>
			</BrowserRouter>
		</ThemeProvider>
	)
}

export default App
