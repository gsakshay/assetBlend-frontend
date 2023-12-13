/** @format */

import { Divider, Grid, Typography } from "@mui/material"
import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router"

import { SelectAssets } from "../components/assets/SelectAsset"
import AssetsTable from "../components/assets/AssetsTable"
import PropTypes from "prop-types"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Box from "@mui/material/Box"

import { user_roles, assets_supported } from "../data/constants"

// Redux
import { useSelector, useDispatch } from "react-redux"
import {
	setStocksSearch,
	setStocksResult,
	setCryptoSearch,
	setCryptoResult,
	setChoosenAsset,
} from "../store/assetReducer"
import { setAllAssets, setAllClients } from "../store/userReducer"
import { setNotification } from "../store/notificationReducer"

// Services
import { getAllCrypto } from "../services/crypto"
import { getAllStocks } from "../services/stocks"
import {
	getAllAssets,
	sellAsset as sellAssetService,
	getAdvisee,
	getAdviseeAsset,
	sellAssetForAdvisee,
} from "../services/user"

function TabPanel(props) {
	const { children, value, index, ...other } = props

	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`vertical-tabpanel-${index}`}
			{...other}>
			{value === index && (
				<Box sx={{ p: 3 }}>
					{Array.isArray(children) ? (
						children.map((child, childIndex) => (
							<div key={childIndex}>{child}</div>
						))
					) : (
						<div>{children}</div>
					)}
				</Box>
			)}
		</div>
	)
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
}

function Assets() {
	const [value, setValue] = React.useState(0)
	const handleChange = (event, newValue) => {
		setValue(newValue)
	}

	const dispatch = useDispatch()
	const cryptoDetails = useSelector((state) => state?.assetReducer?.crypto)
	const stockDetails = useSelector((state) => state?.assetReducer?.stocks)

	const searchChangeCrypto = (value) => dispatch(setCryptoSearch(value))
	const searchChangeStock = (value) => dispatch(setStocksSearch(value))

	const setChoosenAssetAsStock = () =>
		dispatch(setChoosenAsset(assets_supported.STOCK))
	const setChoosenAssetAsCrypto = () =>
		dispatch(setChoosenAsset(assets_supported.CRYPTO))

	const searchCrypto = async () => {
		try {
			// Get the query param
			const query = {
				name: stockDetails?.search,
			}
			const response = await getAllCrypto(query)
			dispatch(setCryptoResult(response))
		} catch (e) {
			console.log(e, "Could not load the asset")
		}
	}

	const searchStock = async () => {
		try {
			// Get the query param
			const query = {
				name: stockDetails?.search,
			}
			const response = await getAllStocks(query)
			dispatch(setStocksResult(response))
		} catch (e) {
			console.log(e, "Could not load the asset")
		}
	}

	const userRole = useSelector((state) => state?.userReducer?.userRole)

	// Role based division - CLIENT
	const allAssets = useSelector((state) => state?.userReducer?.allAssets)

	const sellAsset = async (assetId) => {
		try {
			const response = await sellAssetService(assetId)
			getAllAssetsOfUser()
			dispatch(
				setNotification({
					severity: "success",
					message: "Asset sold successfully",
				})
			)
		} catch (e) {
			dispatch(
				setNotification({
					severity: "error",
					message: "Could not sell the asset! Please try again later",
				})
			)
		}
	}

	const sellAssetOfAdvisee = async (assetId) => {
		try {
			const response = await sellAssetForAdvisee(assetId)
			loadAdviseeAssets(response?.user?._id)
			console.log(response?.user?._id, "Sold asset for the user of the advisor")
			dispatch(
				setNotification({
					severity: "success",
					message: "Asset sold successfully",
				})
			)
		} catch (e) {
			dispatch(
				setNotification({
					severity: "error",
					message: "Could not sell the asset! Please try again later",
				})
			)
		}
	}

	const getAllAssetsOfUser = async () => {
		try {
			const response = await getAllAssets()
			dispatch(setAllAssets(response))
		} catch (e) {
			console.log(e, "Could not load user assets")
		}
	}

	// ADVISOR

	const allClients = useSelector((state) => state.userReducer?.allClients)

	const getAllAdvisee = async () => {
		try {
			const response = await getAdvisee()
			dispatch(setAllClients(response?.adviseeList))
			getAdviseeAssets()
		} catch (e) {
			console.log("Advisee could not be loaded", e?.response?.data?.message)
		}
	}

	// Initially to get all the purchased assets of the user
	useEffect(() => {
		if (userRole === user_roles.CLIENT) {
			getAllAssetsOfUser()
		}
		if (userRole === user_roles.ADVISOR) {
			getAllAdvisee()
		}
	}, [userRole])

	const loadAdviseeAssets = async (adviseeId) => {
		try {
			const response = await getAdviseeAsset(adviseeId)
			dispatch(setAllAssets(response?.assetsList))
			console.log(response?.assetsList)
		} catch (e) {
			console.log(
				"Assets for the users could not be loaded",
				e?.response?.data?.message
			)
		}
	}

	const getAdviseeAssets = () => {
		if (value < allClients.length) {
			const userSelected = allClients?.[value]
			loadAdviseeAssets(userSelected?._id)
		}
	}

	// On change of value, dynamically update the assets for the user
	useEffect(() => {
		getAdviseeAssets()
	}, [value, allClients])

	return (
		<>
			<Typography
				component='h1'
				variant='h4'
				align='center'
				color='text.primary'
				gutterBottom>
				New Assets
			</Typography>
			<br></br>
			<br></br>
			<Grid container spacing={3}>
				<Grid item xs={12} sm={6}>
					<SelectAssets
						details={stockDetails}
						onSearchChange={searchChangeStock}
						search={searchStock}
						assetName='Stocks'
						setChoosen={setChoosenAssetAsStock}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<SelectAssets
						details={cryptoDetails}
						onSearchChange={searchChangeCrypto}
						search={searchCrypto}
						assetName='Crypto'
						setChoosen={setChoosenAssetAsCrypto}
					/>
				</Grid>
			</Grid>
			<Divider />

			{userRole === user_roles.CLIENT && (
				<>
					<Typography
						component='h1'
						variant='h4'
						align='center'
						color='text.primary'
						gutterBottom>
						Manage Assets
					</Typography>
					<br></br>
					<br></br>
					<AssetsTable data={allAssets} sell={sellAsset} />
				</>
			)}

			{userRole === user_roles.ADVISOR && (
				<>
					<Typography
						component='h1'
						variant='h4'
						align='center'
						color='text.primary'
						gutterBottom>
						Manage Assets
					</Typography>
					<br></br>
					<br></br>
					<Box
						sx={{
							flexGrow: 1,
							bgcolor: "background.paper",
							display: "flex",
							width: "100%",
						}}>
						<Tabs
							orientation='vertical'
							variant='scrollable'
							value={value}
							onChange={handleChange}
							sx={{ borderRight: 1, borderColor: "divider" }}>
							{allClients?.map((client) => (
								<Tab
									key={client?._id}
									sx={{ p: 3, textAlign: "center" }}
									label={`${client?.firstName} ${client?.lastName}`}
								/>
							))}
						</Tabs>

						{allClients?.map((client, i) => (
							<TabPanel
								key={client?._id}
								style={{
									width: "100%",
								}}
								value={value}
								index={i}>
								<AssetsTable data={allAssets} sell={sellAssetOfAdvisee} />
							</TabPanel>
						))}
					</Box>
				</>
			)}
		</>
	)
}

export default Assets
