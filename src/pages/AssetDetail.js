/** @format */

import * as React from "react";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Title from "../components/Title";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import AssetsChart from "../components/chart/AssetsChart";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import  {useEffect } from "react"
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
import { addAsset } from "../services/user"
import { useParams } from "react-router"
import { ContactSupportOutlined } from "@mui/icons-material"

function AssetDetail() {
  const userRole = useSelector((state) => state?.userReducer?.userRole);
  console.log(userRole);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
	const dispatch = useDispatch()

	console.log(userRole, "User role")

	const assetSelected = useSelector(
		(state) => state?.assetReducer?.choosenAsset
	)
	const cryptoDetails = useSelector(
		(state) => state?.assetReducer?.cryptoDetail
	)
	const stockDetails = useSelector((state) => state?.assetReducer?.stockDetail)
	console.log("!!:"+stockDetails)
	const addAssetDetails = useSelector((state) => state?.assetReducer?.addAsset)

    if (userRole === "ADVISOR") {
      console.log("Selected User:", selectedUser);
    }
	const [quantity, setQuantity] = useState("")
	const [date, setDate] = useState("")
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
			console.log("response:"+assetId)
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

	const [stockData, setStockData] = useState([]);

	useEffect(() => {

			const fetchStockData = async () => {
			  try {
				// Use require to import the local JSON file
				const jsonData = require("../components/chart/stockdata.json");
				setStockData(jsonData);
			  } catch (error) {
				console.error("Error fetching stock data:", error);
			  }
			};
	  
		  fetchStockData();

		if (assetSelected === assets_supported.STOCK) {
			getStockDetails()
		}

                {userRole === "ADVISOR" && (
                  <FormControl fullWidth margin="normal">
                    <InputLabel id="user-select-label">User</InputLabel>
                    <Select
                      labelId="user-select-label"
                      id="user-select"
                      value={selectedUser}
                      label="User"
                      onChange={(e) => setSelectedUser(e.target.value)}
                    >
                      {users.map((user) => (
                        <MenuItem key={user.id} value={user.name}>
                          {user.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
		if (assetSelected === assets_supported.CRYPTO) {
			getCryptoDetails()
		}
	}, [assetSelected])

	const addNewAsset = async () => {
		const formData = {
			assetData: {
				assetId: assetId,
				quantity: addAssetDetails.quantity,
				datePurchased: dayjs(addAssetDetails?.date).format("YYYY-MM-DD"),
				type: assetSelected === assets_supported.STOCK ? "stock" : "crypto",
			},
		}
		console.log("Adding a new asset")
		try {
			const response = await addAsset(formData)
			console.log(response)
		} catch (e) {
			console.log(e)
		}
	}

	return (
		<div>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby='modal-title'
				aria-describedby='modal-description'>
				<Box sx={style}>
					<Typography id='modal-title' variant='h6' component='h2'>
						Add{" "}
						{assetSelected === assets_supported.STOCK
							? stockDetails?.name
							: cryptoDetails?.name}
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
						value={addAssetDetails?.date}
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
											? stockDetails?.name
											: cryptoDetails?.name}
									</Typography>
								</Grid>
								<Grid item xs={5}>
									<Title>Reporting Currency</Title>
									<Typography component='p' variant='h5'>
										{assetSelected === assets_supported.STOCK
											? stockDetails?.reportingCurrency?.toUpperCase()
											: cryptoDetails?.quoteCurrency?.toUpperCase()}
										{}
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
							<AssetsChart jsonData={stockData} />
						</Paper>
					</Grid>
				</Grid>
			</div>
		</div>
	)
}

export default AssetDetail
