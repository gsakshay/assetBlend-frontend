/** @format */

import React, { useEffect } from "react"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import Link from "@mui/material/Link"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import CustomAppBar from "../components/CustomAppBar/CustomAppBar"

// Redux
import { useSelector, useDispatch } from "react-redux"
import {
	setUserProfile,
	setAuthenticated,
	setRolesAvailable,
	setAuthenticatedUserRole,
} from "../store/userReducer"
import { setNotification } from "../store/notificationReducer"

// Services
import { getAllRoles } from "../services/roles"
import { signup } from "../services/auth"
import { useNavigate } from "react-router"

export default function SignUp() {
	const navigate = useNavigate()

	// Dispatchers
	const dispatch = useDispatch()
	const profileDetails = useSelector((state) => state.userReducer?.profile)
	const allRoles = useSelector((state) => state.userReducer?.rolesAvailable)

	const getAllUserRoles = async () => {
		try {
			const roles = await getAllRoles()
			dispatch(setRolesAvailable(roles))
		} catch (e) {
			console.log(e, "There was a problem in loading roles")
		}
	}

	// Register User
	const handleSubmit = async (event) => {
		event.preventDefault()
		// Get the data ready
		let formData = {
			username: profileDetails?.username,
			firstName: profileDetails?.firstName,
			lastName: profileDetails?.lastName,
			email: profileDetails?.email,
			password: profileDetails?.password,
			phone: profileDetails?.phone,
			role: profileDetails?.role,
			address: profileDetails?.address,
		}

		try {
			const response = await signup(formData)

			// Store the access token, it will be needed when we make further request calls
			sessionStorage.setItem("accessToken", response?.accessToken)
			dispatch(setAuthenticatedUserRole(response?.role))
			dispatch(
				setNotification({
					severity: "success",
					message: "User registered successfully!",
				})
			)
			dispatch(setAuthenticated(true))
			navigate("/app/dashboard")
		} catch (e) {
			dispatch(
				setNotification({
					severity: "error",
					message: e?.response?.data?.message,
				})
			)
		}
	}

	useEffect(() => {
		getAllUserRoles()
	}, [])

	return (
		<>
			<CustomAppBar />
			<Container component='main' maxWidth='xs'>
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}>
					<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component='h1' variant='h5'>
						Sign up
					</Typography>
					<Box noValidate sx={{ mt: 3 }}>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<TextField
									autoComplete='given-name'
									name='firstName'
									required
									fullWidth
									id='firstName'
									label='First Name'
									autoFocus
									value={profileDetails.firstName}
									onChange={(e) => {
										dispatch(
											setUserProfile({
												...profileDetails,
												firstName: e.target.value,
											})
										)
									}}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									required
									fullWidth
									id='lastName'
									label='Last Name'
									name='lastName'
									autoComplete='family-name'
									value={profileDetails.lastName}
									onChange={(e) => {
										dispatch(
											setUserProfile({
												...profileDetails,
												lastName: e.target.value,
											})
										)
									}}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									id='email'
									label='Email Address'
									name='email'
									autoComplete='email'
									value={profileDetails.email}
									onChange={(e) => {
										dispatch(
											setUserProfile({
												...profileDetails,
												email: e.target.value,
											})
										)
									}}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									// type='number'
									required
									fullWidth
									id='phone'
									label='Phone Number'
									name='phone'
									autoComplete='phone'
									value={profileDetails.phone}
									onChange={(e) => {
										dispatch(
											setUserProfile({
												...profileDetails,
												phone: e.target.value,
											})
										)
									}}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									autoComplete='username'
									name='username'
									required
									fullWidth
									id='username'
									label='Username'
									value={profileDetails.username}
									onChange={(e) => {
										dispatch(
											setUserProfile({
												...profileDetails,
												username: e.target.value,
											})
										)
									}}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									required
									fullWidth
									name='password'
									label='Password'
									type='password'
									id='password'
									autoComplete='new-password'
									value={profileDetails.password}
									onChange={(e) => {
										dispatch(
											setUserProfile({
												...profileDetails,
												password: e.target.value,
											})
										)
									}}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									// required
									fullWidth
									id='address'
									label='Address'
									name='address'
									autoComplete='address'
									value={profileDetails.address}
									onChange={(e) => {
										dispatch(
											setUserProfile({
												...profileDetails,
												address: e.target.value,
											})
										)
									}}
								/>
							</Grid>
							<Grid item xs={12}>
								<FormControl fullWidth>
									<InputLabel id='user-role'>Role</InputLabel>
									<Select
										labelId='user-role'
										id='user-role'
										value={profileDetails.role}
										label='Role'
										onChange={(e) =>
											dispatch(
												setUserProfile({
													...profileDetails,
													role: e.target.value,
												})
											)
										}>
										{allRoles &&
											allRoles.map((role) => (
												<MenuItem key={role?._id} value={role?._id}>
													{role?.roleName}
												</MenuItem>
											))}
									</Select>
								</FormControl>
							</Grid>
						</Grid>
						<Button
							type='submit'
							fullWidth
							variant='contained'
							color='secondary'
							sx={{ mt: 3, mb: 2 }}
							onClick={handleSubmit}
							disabled={
								!profileDetails.username ||
								!profileDetails.role ||
								!profileDetails.firstName ||
								!profileDetails.lastName ||
								!profileDetails.email ||
								!profileDetails.phone ||
								!profileDetails.password ||
								!profileDetails.address
							}>
							Sign Up
						</Button>
						<Grid container justifyContent='flex-end'>
							<Grid item>
								<Link href='/signin' variant='body2'>
									Already have an account? Sign in
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Container>
		</>
	)
}
