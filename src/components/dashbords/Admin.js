/** @format */

/** @format */
import * as React from "react"
import { useEffect, useState } from "react"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import Title from "../Title"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import CancelIcon from "@mui/icons-material/Cancel"
import DeleteIcon from "@mui/icons-material/Delete"
import AddIcon from "@mui/icons-material/Add"
import Button from "@mui/material/Button" // Import Button component
import Dialog from "@mui/material/Dialog" // Import Dialog component
import DialogTitle from "@mui/material/DialogTitle" // Import DialogTitle component
import DialogContent from "@mui/material/DialogContent" // Import DialogContent component
import TextField from "@mui/material/TextField" // Import TextField component
import { Link } from "react-router-dom"
import { searchStocks } from "./DumyAPI"

function createData(id, name, data1, data2) {
	return { id, name, data1, data2 }
}

const rows = [
	createData(0, "Denn", 20.3, 100.1),
	createData(0, "Denn", 20.3, 100.1),
	createData(0, "Denn", 20.3, 100.1),
	createData(0, "Denn", 20.3, 100.1),
	createData(0, "Denn", 20.3, 100.1),
	createData(0, "Denn", 20.3, 100.1),
]

const assets = [
	createData(0, "Amazon"),
	createData(0, "Amazon"),
	createData(0, "Amazon"),
	createData(0, "Amazon"),
	createData(0, "Amazon"),
	createData(0, "Amazon"),
]

function AdminDashboard({
	data,
	requests,
	newsAssets,
	approveAdvisor,
	rejectAdvisor,
}) {
	const [isDialogOpen, setIsDialogOpen] = useState(false)

	const handleAddAssetClick = () => {
		setIsDialogOpen(true)
	}

	const handleCloseDialog = () => {
		setIsDialogOpen(false)
	}

	//   For Search
	const [searchQuery, setSearchQuery] = useState("")
	const [searchResults, setSearchResults] = useState([])

	const handleSearchChange = (event) => {
		const query = event.target.value
		setSearchQuery(query)

		// Call the searchStocks function and update the searchResults state
		const results = searchStocks(query)
		setSearchResults(results)
	}

	const [assetManagmentData, setAssetManagmentData] = useState({
		assets: 22,
		clients: 32,
	})
	return (
		<div>
			<Grid container spacing={3}>
				<Grid item xs={12} md={6}>
					{/* <Link to='/app/UsersList'> */}
					<Paper
						sx={{
							p: 2,
							display: "flex",
							flexDirection: "column",
							// height: 240,
						}}>
						<Title>Total Number of Users</Title>
						<Typography component='p' variant='h4'>
							{data?.totalUsersCount}
						</Typography>
					</Paper>
					{/* </Link> */}
				</Grid>

				{/* <Grid item xs={12} md={4}>
					<Link to='/app/AdvisorList'>
						<Paper
							sx={{
								p: 2,
								display: "flex",
								flexDirection: "column",
								// height: 240,
							}}>
							<Title>Total Number of Advisor</Title>
							<Typography component='p' variant='h4'>
								22
							</Typography>
						</Paper>
					</Link>
				</Grid> */}

				<Grid item xs={12} md={6}>
					<Paper
						sx={{
							p: 2,
							display: "flex",
							flexDirection: "column",
							// height: 240,
						}}>
						<Title>Total Number of Assets</Title>
						<Typography component='p' variant='h4'>
							{data?.totalAssetsCount}
						</Typography>
					</Paper>
				</Grid>

				<Grid item md={6} xs={12}>
					<Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
						<Title>Advisor Request</Title>
						<Table size='small'>
							<TableHead>
								<TableRow>
									<TableCell>Name</TableCell>
									<TableCell align='center' style={{ verticalAlign: "middle" }}>
										Approve
									</TableCell>
									<TableCell align='center' style={{ verticalAlign: "middle" }}>
										Reject
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{requests?.map((row) => (
									<TableRow key={row?._id}>
										<TableCell>{`${row?.firstName} ${row?.lastName}`}</TableCell>
										<TableCell
											align='center'
											style={{ verticalAlign: "middle" }}>
											<Button onClick={() => approveAdvisor(row?._id)}>
												<CheckCircleIcon style={{ color: "green" }} />
											</Button>
										</TableCell>
										<TableCell
											align='center'
											style={{ verticalAlign: "middle" }}>
											<Button onClick={() => rejectAdvisor(row?._id)}>
												<CancelIcon style={{ color: "red" }} />
											</Button>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</Paper>
				</Grid>

				<Dialog
					open={isDialogOpen}
					md={12}
					xs={12}
					onClose={handleCloseDialog}
					align='center'
					style={{ verticalAlign: "middle" }}>
					<DialogTitle>Add Asset</DialogTitle>
					<DialogContent>
						{/* Add a TextField for search with onChange event */}
						<TextField
							label='Search Asset'
							fullWidth
							style={{ marginTop: "5px" }}
							value={searchQuery}
							onChange={handleSearchChange}
						/>

						{/* Display search results */}
						{searchResults.map((result) => (
							<div key={result}>
								<Button
									variant='contained'
									color='primary'
									style={{ marginTop: "12px", width: "100%" }}
									onClick={() => {
										// Handle selection logic (add to the assets array, for example)
										console.log(`Selected: ${result}`)
									}}>
									{result}
								</Button>
							</div>
						))}
					</DialogContent>
				</Dialog>
				<Grid item md={6} xs={12}>
					<Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
						<Title
							style={{
								display: "flex",
								flexDirection: "row",
								justifyContent: "space-between",
								alignItems: "left",
							}}>
							Main Page Assets
							{/* <Button
								variant='outlined'
								onClick={handleAddAssetClick}
								style={{ float: "right" }}>
								<AddIcon />
							</Button> */}
						</Title>

						<Table size='small'>
							<TableHead>
								<TableRow>
									<TableCell>
										<strong>Name</strong>
									</TableCell>
									{/* <TableCell align='center' style={{ verticalAlign: "middle" }}>
										Remove
									</TableCell> */}
								</TableRow>
							</TableHead>
							<TableBody>
								{newsAssets?.map((row) => (
									<TableRow key={row?._id}>
										<TableCell>{row?.name}</TableCell>
										{/* <TableCell
											align='center'
											style={{ verticalAlign: "middle" }}>
											<Button>
												<DeleteIcon style={{ color: "red" }} />
											</Button>
										</TableCell> */}
									</TableRow>
								))}
							</TableBody>
						</Table>
					</Paper>
				</Grid>
			</Grid>
		</div>
	)
}

export default AdminDashboard
