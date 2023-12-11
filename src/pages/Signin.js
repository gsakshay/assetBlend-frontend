/** @format */

import * as React from "react"
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
import { useNavigate, useParams } from "react-router"
import CustomAppBar from "../components/CustomAppBar/CustomAppBar"

// Redux
import { useSelector, useDispatch } from "react-redux"
import {
	setUserProfile,
	setAuthenticated,
	setAuthenticatedUserRole,
} from "../store/userReducer"
import { setNotification } from "../store/notificationReducer"
// Services
import { signin } from "../services/auth"

export default function SignUp() {
	const navigate = useNavigate()

	const dispatch = useDispatch()
	const profileDetails = useSelector((state) => state.userReducer?.profile)

	const handleSignin = async (event) => {
		event.preventDefault()

		const formData = {
			username: profileDetails.username,
			password: profileDetails.password,
		}

		try {
			const response = await signin(formData)

			// Store the access token, it will be needed when we make further request calls
			sessionStorage.setItem("accessToken", response?.accessToken)
			dispatch(setAuthenticatedUserRole(response?.role))
			dispatch(
				setNotification({
					severity: "success",
					message: "User logged in successfully!",
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

	return (
		<>
			<CustomAppBar />
			<Container component='main' maxWidth='xs'>
				<Box
					sx={{
						marginTop: 8,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}>
					<Avatar sx={{ m: 1, bgcolor: "primary" }}>
						<LockOutlinedIcon color='primary' />
					</Avatar>
					<Typography component='h1' variant='h5'>
						Sign In
					</Typography>
					<Box noValidate sx={{ mt: 3 }}>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<TextField
									autoComplete='username'
									name='username'
									required
									fullWidth
									id='username'
									label='Username'
									autoFocus
									value={profileDetails?.username}
									onChange={(e) =>
										dispatch(
											setUserProfile({
												...profileDetails,
												username: e.target.value,
											})
										)
									}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									name='password'
									label='Password'
									type='password'
									id='password'
									autoComplete='new-password'
									value={profileDetails.password}
									onChange={(e) =>
										dispatch(
											setUserProfile({
												...profileDetails,
												password: e.target.value,
											})
										)
									}
								/>
							</Grid>
						</Grid>
						<Button
							onClick={handleSignin}
							type='submit'
							fullWidth
							variant='contained'
							color='primary'
							disabled={!profileDetails.username || !profileDetails.password}
							sx={{ mt: 3, mb: 2 }}>
							Sign In
						</Button>
						<Grid container justifyContent='flex-end'>
							<Grid item>
								<Link href='/signup' variant='body2'>
									Don't have an account yet? Sign Up
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Container>
		</>
	)
}
