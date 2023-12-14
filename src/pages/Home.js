/** @format */

import React, { useState, useEffect } from "react"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import CssBaseline from "@mui/material/CssBaseline"
import Grid from "@mui/material/Grid"
import Stack from "@mui/material/Stack"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { Link } from "react-router-dom"
import TextField from "@mui/material/TextField"
import MenuItem from "@mui/material/MenuItem"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import dayjs from "dayjs"
import CustomAppBar from "../components/CustomAppBar/CustomAppBar"
import { setNewsAssets } from "../store/assetReducer"
import { useDispatch, useSelector } from "react-redux"

import { capitalize } from "../utils/helperFunctions"

// Service
import { getNewsAssets, sampleEvaluate } from "../services/assets"
import { setNotification } from "../store/notificationReducer"

export default function Home() {
	const dispatch = useDispatch()
	const newsAssets = useSelector((state) => state?.assetReducer?.newsAssets)

	const getHomePageAssets = async () => {
		try {
			const response = await getNewsAssets()
			dispatch(setNewsAssets(response))
		} catch (e) {
			console.log("Could not load news assets", e?.response?.data?.message)
		}
	}

	useEffect(() => {
		getHomePageAssets()
	}, [])

	// For a simple POST
	const [assetSelected, setAssetSelected] = useState("")
	const [count, setCount] = useState(10)
	const [purchasedDate, setPurchasedDate] = useState(dayjs())

	const [evaluationReport, setEvaluationReport] = useState(null)

	const evaluate = async () => {
		const assetData = newsAssets?.find((asset) => asset?._id === assetSelected)
		const params = {
			type: assetData?.type,
		}
		const formData = {
			assetId: assetSelected,
			quantity: count,
			ticker: assetData?.ticker,
			datePurchased: purchasedDate.format("YYYY-MM-DD"),
		}
		try {
			const response = await sampleEvaluate(params, formData)
			setEvaluationReport(response)
			// dispatch(
			// 	setNotification({
			// 		severity: "success",
			// 		message: "Evaluation Reported!",
			// 	})
			// )
		} catch (e) {
			console.log(e)
			dispatch(
				setNotification({
					severity: "error",
					message: e?.response?.data?.message,
				})
			)
		}
	}

	const isWeekend = (date) => {
		const day = date.day()
		return day === 0 || day === 6
	}

	return (
		<>
			<CssBaseline />
			<CustomAppBar />
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
							Welcome to Asset Alchemy, your personalized gateway to financial
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
						{newsAssets?.map((card) => (
							<Grid item key={card?._id} xs={12} sm={6} md={4}>
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
											{card?.name}
										</Typography>
										<Typography>{capitalize(card?.type)}</Typography>
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
								value={assetSelected}
								onChange={(e) => setAssetSelected(e.target.value)}
								variant='standard'>
								{newsAssets?.map((option) => (
									<MenuItem key={option._id} value={option._id}>
										{option?.name}
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
								value={count}
								onChange={(e) => setCount(e.target.value)}
							/>
							<br></br>
							<br></br>

							<DatePicker
								fullWidth
								label='Date of Purchase'
								value={purchasedDate}
								shouldDisableDate={isWeekend}
								onChange={(newDate, e) => setPurchasedDate(newDate)}
							/>
							<br></br>
							<br></br>
							<Button
								disabled={!(assetSelected && count && purchasedDate)}
								fullWidth
								color='secondary'
								variant='outlined'
								onClick={evaluate}>
								Evaluate
							</Button>
						</Grid>
						{evaluationReport && (
							<Grid item xs={8}>
								{evaluationReport?.gainLoss < 0 ? (
									<Typography variant='p' align='center' color='red' paragraph>
										{`Currently, your investment shows a loss of ${evaluationReport?.gainLoss?.toFixed(
											2
										)} (${evaluationReport?.percentGainLoss?.toFixed(
											2
										)}%) from the
										purchase date and you would be getting ${
											evaluationReport?.currentValue
										} if you sold today.`}
									</Typography>
								) : (
									<Typography
										variant='p'
										align='center'
										color='green'
										paragraph>
										{`Congratulations! You're currently experiencing a profit of
									${evaluationReport?.gainLoss?.toFixed(
										2
									)} (${evaluationReport?.percentGainLoss?.toFixed(
											2
										)}%) since your purchase and you would be getting ${
											evaluationReport?.currentValue
										} if you sold today.`}
									</Typography>
								)}
							</Grid>
						)}
					</Grid>
				</Container>
			</main>
		</>
	)
}
