/** @format */

import * as React from "react"
import { useState } from "react"
import TextField from "@mui/material/TextField"
import Paper from "@mui/material/Paper"
import Title from "../components/Title"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Modal from "@mui/material/Modal"
import AssetsChart from "../components/chart/AssetsChart"
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material"
import { useEffect } from "react"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import dayjs from "dayjs"
import Grid from "@mui/material/Grid"

import { user_roles, assets_supported } from "../data/constants"
import { capitalize } from "../utils/helperFunctions"

// Redux
import { useSelector, useDispatch } from "react-redux"
import { setNotification } from "../store/notificationReducer"
import {
	setStockDetail,
	setCryptoDetail,
	setAddAsset,
} from "../store/assetReducer"

// Services
import { getParticularCrypto } from "../services/crypto"
import { getParticularStock } from "../services/stocks"
import { addAsset, addAssetForAdvisee } from "../services/user"
import { useParams } from "react-router"
import { ContactSupportOutlined } from "@mui/icons-material"
import { addNewsAsset } from "../services/admin"

function AssetDetail() {
	const userRole = useSelector((state) => state?.userReducer?.userRole)
	const dispatch = useDispatch()

	const assetSelected = useSelector(
		(state) => state?.assetReducer?.choosenAsset
	)
	const cryptoDetails = useSelector(
		(state) => state?.assetReducer?.cryptoDetail
	)
	const stockDetails = useSelector((state) => state?.assetReducer?.stockDetail)
	console.log(
		"TesingStockDetails:",
		cryptoDetails?.priceData,
		stockDetails?.priceData
	)
	const addAssetDetails = useSelector((state) => state?.assetReducer?.addAsset)

	const [openAddAssetModel, setOpenAddAssetModel] = useState(false)
	const handleOpenAddAssetModel = () => setOpenAddAssetModel(true)
	const handleCloseAddAssetModel = () => setOpenAddAssetModel(false)

	const allClients = useSelector((state) => state.userReducer?.allClients)

	const [selectedUser, setSelectedUser] = useState("")

	const users = [
		{ id: 1, name: "User 1" },
		{ id: 2, name: "User 2" },
		{ id: 3, name: "User 3" },
	]

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
			console.log("response:" + assetId)
			const response = await getParticularStock(assetId)

			dispatch(setStockDetail(response))
		} catch (e) {
			console.log("Failed to fetch Stock details", e?.response?.data?.message)
		}
	}

	const getCryptoDetails = async () => {
		try {
			const response = await getParticularCrypto(assetId)
			dispatch(setCryptoDetail(response))
		} catch (e) {
			console.log("Failed to fetch Crypto details", e?.response?.data?.message)
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

	const addNewAsset = async () => {
		const formData = {
			assetId: assetId,
			quantity: addAssetDetails.quantity,
			datePurchased: dayjs(addAssetDetails?.date).format("YYYY-MM-DD"),
			type: assetSelected === assets_supported.STOCK ? "stock" : "crypto",
		}

		if (userRole === user_roles.CLIENT) {
			try {
				const response = await addAsset(formData)
				// TODO: update the store with response to reduce the api calls - Future update
				// console.log(response)
				dispatch(
					setNotification({
						severity: "success",
						message: "Added asset successfully!",
					})
				)
				handleCloseAddAssetModel()
			} catch (e) {
				dispatch(
					setNotification({
						severity: "error",
						message: "Could not add asset! Please try again",
					})
				)
			}
		} else {
			try {
				if (!addAssetDetails?.user?._id) {
					console.log("User not selected")
					return
				}

				const response = await addAssetForAdvisee(
					addAssetDetails?.user?._id,
					formData
				)
				// TODO: update the store with response to reduce the api calls - Future update
				// console.log(response)
				dispatch(
					setNotification({
						severity: "success",
						message: "Added asset successfully!",
					})
				)
				handleCloseAddAssetModel()
			} catch (e) {
				dispatch(
					setNotification({
						severity: "error",
						message: "Could not add asset! Please try again",
					})
				)
			}
		}
	}

	// Handling Admin Features

	const addAssetToNews = async () => {
		const stocks = []
		const cryptos = []

		if (assetSelected === assets_supported.STOCK) {
			stocks.push(assetId)
		} else {
			cryptos.push(assetId)
		}

		const formData = {
			crypto: cryptos,
			stock: stocks,
		}
		try {
			const response = await addNewsAsset(formData)
			console.log(response, "Response of adding an asset")
			dispatch(
				setNotification({
					severity: "success",
					message: "Added asset to NEWS successfully!",
				})
			)
			if (assetSelected === assets_supported.STOCK) {
				getStockDetails()
			}

			if (assetSelected === assets_supported.CRYPTO) {
				getCryptoDetails()
			}
		} catch (e) {
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
		<div>
			<Modal
				open={openAddAssetModel}
				onClose={handleCloseAddAssetModel}
				aria-labelledby='modal-title'
				aria-describedby='modal-description'>
				<Box sx={style}>
					<Typography id='modal-title' variant='h6' component='h2'>
						Add{" "}
						{assetSelected === assets_supported.STOCK
							? stockDetails?.asset?.name
							: cryptoDetails?.asset?.name}
					</Typography>

					<TextField
						id='quantity'
						label='Quantity'
						type='number'
						fullWidth
						margin='normal'
						value={addAssetDetails?.quantity}
						onChange={(e) =>
							dispatch(
								setAddAsset({ ...addAssetDetails, quantity: e.target.value })
							)
						}
					/>

					<DatePicker
						label='Date purchased'
						value={dayjs(addAssetDetails?.date)}
						shouldDisableDate={isWeekend}
						onChange={(newDate) =>
							dispatch(setAddAsset({ ...addAssetDetails, date: newDate }))
						}
					/>

					{userRole === user_roles.ADVISOR && (
						<FormControl fullWidth margin='normal'>
							<InputLabel id='user-select-label'>User</InputLabel>
							<Select
								labelId='user-select-label'
								id='user-select'
								value={addAssetDetails?.user?._id}
								label='User'
								onChange={(e) =>
									dispatch(
										setAddAsset({
											...addAssetDetails,
											user: {
												...addAssetDetails.user,
												_id: e.target.value,
											},
										})
									)
								}>
								{allClients?.map((user) => (
									<MenuItem key={user?._id} value={user?._id}>
										{`${user?.firstName} ${user?.lastName}`}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					)}

					<Button
						variant='contained'
						color='primary'
						fullWidth
						onClick={addNewAsset}
						disabled={
							userRole === user_roles.CLIENT
								? !addAssetDetails?.quantity || !addAssetDetails?.date
								: !addAssetDetails?.quantity ||
								  !addAssetDetails?.date ||
								  !addAssetDetails?.user?._id
						}
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
									<Typography component='p' variant='h5'>
										{assetSelected === assets_supported.STOCK
											? stockDetails?.asset?.name
											: cryptoDetails?.asset?.name}
									</Typography>
								</Grid>
								<Grid item xs={5}>
									<Title>Reporting Currency</Title>
									<Typography component='p' variant='h5'>
										{assetSelected === assets_supported.STOCK
											? stockDetails?.asset?.reportingCurrency?.toUpperCase()
											: cryptoDetails?.asset?.quoteCurrency?.toUpperCase()}
									</Typography>
								</Grid>
								<Grid item xs={2}>
									{userRole === user_roles.ADMIN ? (
										<Button
											onClick={addAssetToNews}
											variant='contained'
											color='primary'
											disabled={
												assetSelected === assets_supported?.STOCK
													? stockDetails?.asset?.isNews
													: cryptoDetails?.asset?.isNews
											}
											sx={{ mt: 1, mb: 0 }}>
											{(
												assetSelected === assets_supported?.STOCK
													? stockDetails?.asset?.isNews
													: cryptoDetails?.asset?.isNews
											)
												? `Asset is already in NEWS`
												: `Add Asset to News`}
										</Button>
									) : (
										<Button
											onClick={handleOpenAddAssetModel}
											variant='contained'
											color='primary'
											sx={{ mt: 1, mb: 0 }}>
											Add Asset
										</Button>
									)}
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
							<AssetsChart
								jsonData={
									assetSelected === assets_supported.STOCK
										? stockDetails?.priceData
										: cryptoDetails?.priceData
								}
							/>
						</Paper>
					</Grid>
				</Grid>
			</div>
		</div>
	)
}

export default AssetDetail
