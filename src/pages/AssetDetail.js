/** @format */

import React, { useState, useEffect } from "react"
import TextField from "@mui/material/TextField"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import Title from "../components/Title"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Modal from "@mui/material/Modal"
import AssetsChart from "../components/chart/AssetsChart"
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material"

import { assets_supported } from "../data/constants"
import { capitalize } from "../utils/helperFunctions"
// Redux
import { useSelector, useDispatch } from "react-redux"
import { setNotification } from "../store/notificationReducer"

import { setStockDetail, setCryptoDetail } from "../store/assetReducer"

// Services
import { getParticularCrypto } from "../services/crypto"
import { getParticularStock } from "../services/stocks"
import { useParams } from "react-router"
import { ContactSupportOutlined } from "@mui/icons-material"

function AssetDetail() {
	const dispatch = useDispatch()

	const userRole = "advisor"
	const assetSelected = useSelector(
		(state) => state?.assetReducer?.choosenAsset
	)
	const cryptoDetails = useSelector(
		(state) => state?.assetReducer?.cryptoDetail
	)
	const stockDetails = useSelector((state) => state?.assetReducer?.stockDetail)

	const [open, setOpen] = React.useState(false)
	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)

	const [quantity, setQuantity] = useState("")
	const [date, setDate] = useState("")
	const [selectedUser, setSelectedUser] = useState("")

	const users = [
		{ id: 1, name: "User 1" },
		{ id: 2, name: "User 2" },
		{ id: 3, name: "User 3" },
	]

	const stockData = {
		name: "Amazon",
	}

	const handleSubmit = () => {
		// Handle the submission logic here
		console.log("Stock Name:", stockData.name)
		console.log("Quantity:", quantity)
		console.log("Date:", date)

		if (userRole === "advisor") {
			console.log("Selected User:", selectedUser)
		}

		// Close the modal after submission
		handleClose()
	}

	const style = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: 400,
		bgcolor: "background.paper",
		boxShadow: 24,
		p: 4,
	}

	// Stateful opertaions

	const { assetId } = useParams()

	const getStockDetails = async () => {
		try {
			const response = await getParticularStock(assetId)
			dispatch(setStockDetail(response))
		} catch (e) {
			console.log("Failed to fetch Stock details", e)
		}
	}

	const getCryptoDetails = async () => {
		try {
			const response = await getParticularCrypto(assetId)
			dispatch(setCryptoDetail(response))
		} catch (e) {
			console.log("Failed to fetch Crypto details", e)
		}
	}

	useEffect(() => {
		if (assetSelected === assets_supported.STOCK) {
			getStockDetails()
		}

		if (assetSelected === assets_supported.CRYPTO) {
			getCryptoDetails()
		}
	}, [assetSelected])

	console.log(stockDetails, "Stock details")

	return (
		<div>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby='modal-title'
				aria-describedby='modal-description'>
				<Box sx={style}>
					<Typography id='modal-title' variant='h6' component='h2'>
						{stockData.name}
					</Typography>

					<TextField
						id='quantity'
						label='Quantity'
						type='number'
						fullWidth
						margin='normal'
						value={quantity}
						onChange={(e) => setQuantity(e.target.value)}
					/>

					<TextField
						id='date'
						label='Date'
						type='date'
						fullWidth
						margin='normal'
						InputLabelProps={{
							shrink: true,
						}}
						value={date}
						onChange={(e) => setDate(e.target.value)}
					/>

					{userRole === "advisor" && (
						<FormControl fullWidth margin='normal'>
							<InputLabel id='user-select-label'>User</InputLabel>
							<Select
								labelId='user-select-label'
								id='user-select'
								value={selectedUser}
								label='User'
								onChange={(e) => setSelectedUser(e.target.value)}>
								{users.map((user) => (
									<MenuItem key={user.id} value={user.name}>
										{user.name}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					)}

					<Button
						variant='contained'
						color='primary'
						fullWidth
						onClick={handleSubmit}
						sx={{ mt: 2 }}>
						Confirm
					</Button>
				</Box>
			</Modal>
			<div>
				<Grid container spacing={3}>
					<Grid item xs={12} md={12} lg={12}>
						<Paper
							sx={{
								p: 2,
								display: "flex",
								flexDirection: "column",
							}}>
							<Grid alignItems='center' container spacing={2}>
								<Grid item xs={5}>
									<Title>Name</Title>
									<Typography component='p' variant='h4'>
										{stockDetails?.name}
									</Typography>
								</Grid>
								<Grid item xs={5}>
									<Title>Reporting Currency</Title>
									<Typography component='p' variant='h4'>
										{stockDetails?.reportingCurrency?.toUpperCase()}
									</Typography>
								</Grid>
								<Grid item xs={2}>
									<Button
										onClick={handleOpen}
										variant='contained'
										color='primary'
										sx={{ mt: 1, mb: 0 }}>
										Add Asset
									</Button>
								</Grid>
							</Grid>
						</Paper>
					</Grid>

					{/* Chart */}
					<Grid item xs={12} md={12} lg={12}>
						<Paper
							sx={{
								p: 2,
								display: "flex",
								flexDirection: "column",
								// height: 240,
							}}>
							<AssetsChart />
						</Paper>
					</Grid>
				</Grid>
			</div>
		</div>
	)
}

export default AssetDetail
