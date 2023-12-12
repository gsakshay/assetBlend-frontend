/** @format */

import { Divider, Grid, Typography } from "@mui/material"
import React from "react"
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
import { setNotification } from "../store/notificationReducer"

// Services
import { getAllCrypto, getParticularCrypto } from "../services/crypto"
import { getAllStocks, getParticularStock } from "../services/stocks"

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
	console.log("Temp:"+value)
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
		// TODO
	}

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
						Manage Assets (For Advisors)
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
							<Tab sx={{ p: 3, textAlign: "center" }} label='User 1' />
							<Tab sx={{ p: 3 }} label='User 2' />
						</Tabs>

						<TabPanel
							style={{
								width: "100%",
							}}
							value={value}
							index={0}>
							<AssetsTable />
						</TabPanel>
						<TabPanel
							style={{
								width: "100%",
							}}
							value={value}
							index={1}>
							<AssetsTable />
						</TabPanel>
					</Box>
				</>
			)}
		</>
	)
}

export default Assets
