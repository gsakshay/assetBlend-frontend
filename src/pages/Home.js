/** @format */

import React, { useState } from "react"
import AppBar from "@mui/material/AppBar"
import Button from "@mui/material/Button"
import PaidIcon from "@mui/icons-material/Paid"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import CssBaseline from "@mui/material/CssBaseline"
import Grid from "@mui/material/Grid"
import Stack from "@mui/material/Stack"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { ThemeProvider } from "@mui/material/styles"
import { Link } from "react-router-dom"
import TextField from "@mui/material/TextField"
import MenuItem from "@mui/material/MenuItem"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import dayjs from "dayjs"

const cards = [1, 2, 3, 4, 5, 6]

const currencies = [
	{
		value: "Apple",
		label: "Apple",
	},
	{
		value: "Amazon",
		label: "Amazon",
	},
	{
		value: "Bitcoin",
		label: "Bitcoin",
	},
	{
		value: "Dogecoin",
		label: "Dogecoin",
	},
]

export default function Home() {
	const [purchasedDate, setPurchasedDate] = useState(dayjs("2022-04-17"))
	return (
		<>
			<CssBaseline />
			<AppBar position='relative'>
				<Toolbar>
					<PaidIcon sx={{ mr: 2 }} />
					<Typography variant='h6' color='inherit' noWrap>
						Asset Alchamy
					</Typography>
				</Toolbar>
			</AppBar>
			<main>
				{/* Hero unit */}
				<Box
					sx={{
						bgcolor: "background.paper",
						pt: 8,
						pb: 6,
					}}>
					<Container maxWidth='lg'>
						<Typography
							component='h1'
							variant='h2'
							align='center'
							color='text.primary'
							gutterBottom>
							Empowering Your Financial Journey
						</Typography>
						<Typography
							variant='h5'
							align='center'
							color='text.secondary'
							paragraph>
							Welcome to Asset Alchamy, your personalized gateway to financial
							empowerment. Experience tailored analytics, seamless portfolio
							management, and insightful market trends. From personalized
							dashboards to expert advice, explore the realm of financial growth
							effortlessly.
						</Typography>
						<Stack
							sx={{ pt: 4 }}
							direction='row'
							spacing={2}
							justifyContent='center'>
							<Link to='/signin'>
								<Button variant='contained'>Sign In</Button>
							</Link>
							<Link to='signup'>
								<Button variant='outlined'>Sign Up</Button>
							</Link>
						</Stack>
					</Container>
				</Box>
				<Container sx={{ py: 8 }} maxWidth='lg'>
					<Typography
						component='h1'
						variant='h4'
						align='center'
						color='text.primary'
						gutterBottom>
						Navigate through assets
					</Typography>
					<br></br>
					<Grid container spacing={4}>
						{cards.map((card) => (
							<Grid item key={card} xs={12} sm={6} md={4}>
								<Card
									sx={{
										height: "100%",
										display: "flex",
										flexDirection: "column",
									}}>
									<CardMedia
										component='div'
										sx={{
											// 16:9
											pt: "56.25%",
										}}
										image='https://media.istockphoto.com/id/183865137/photo/businessman-is-stacking-coins.jpg?b=1&s=612x612&w=0&k=20&c=j1iNWTZmLKG0_ElSbpGn-xjR7M6B76itSt4T2WMdpMg='
									/>
									<CardContent sx={{ flexGrow: 1 }}>
										<Typography gutterBottom variant='h5' component='h2'>
											Asset Name
										</Typography>
										<Typography>Some asset details will come here</Typography>
									</CardContent>
								</Card>
							</Grid>
						))}
					</Grid>
				</Container>
				<Container sx={{ py: 8 }} maxWidth='lg'>
					<Typography
						component='h1'
						variant='h4'
						align='center'
						color='text.primary'
						gutterBottom>
						Instant Portfolio Evaluation
					</Typography>
					<br></br>
					<Typography
						variant='p'
						align='center'
						color='text.secondary'
						paragraph>
						Explore the potential of your investments effortlessly. Enter your
						stock or cryptocurrency purchase details below and uncover its
						current market value. Whether you're tracking your first investment
						or a seasoned observer, our real-time evaluation tool provides
						insights into your holdings' performance. Gain clarity on profits or
						losses, empowering smarter financial decisions.
						<br />
						Start exploring now.
					</Typography>
					<br></br>
					<Grid
						container
						spacing={4}
						direction='column'
						alignItems='center'
						justifyContent='center'>
						<Grid item xs={6}>
							<TextField
								fullWidth
								id='standard-select-currency'
								select
								label='Asset'
								helperText='Which is the asset?'
								variant='standard'>
								{currencies.map((option) => (
									<MenuItem key={option.value} value={option.value}>
										{option.label}
									</MenuItem>
								))}
							</TextField>
							<TextField
								fullWidth
								id='count'
								label='Count'
								helperText='Count of purchase?'
								variant='standard'
								type='number'
							/>
							<br></br>
							<br></br>

							<DatePicker
								fullWidth
								label='Date of Purchase'
								value={purchasedDate}
								onChange={(newValue) => setPurchasedDate(newValue)}
							/>
							<br></br>
							<br></br>
							<Button fullWidth color='secondary' variant='outlined'>
								Evaluate
							</Button>
						</Grid>
						<Grid item xs={8}>
							<Typography variant='p' align='center' color='primary' paragraph>
								Congratulations! You're currently experiencing a profit of
								$525.00 (3.00%) since your purchase on May 15, 2023.
							</Typography>
						</Grid>
					</Grid>
				</Container>
			</main>
		</>
	)
}
