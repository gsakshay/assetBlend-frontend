/** @format */

/** @format */
import * as React from "react"

import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"

import { Route, Routes } from "react-router"
import Title from "../Title"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material"
import { Link } from "react-router-dom"

function createData(id, date, asset, amount, action) {
	return { id, date, asset, amount, action }
}

const rows = [
	createData(0, "16 Mar, 2019", "Apple", 100, "Buy"),
	createData(0, "16 Mar, 2019", "Apple", 100, "Buy"),
	createData(0, "16 Mar, 2019", "Apple", 100, "Buy"),
	createData(0, "16 Mar, 2019", "Apple", 100, "Buy"),
	createData(0, "16 Mar, 2019", "Apple", 100, "Buy"),
]

function Dashboard() {
	return (
		<div>
			<Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
				<Grid container spacing={3}>
					{/* Chart */}
					{/* <Grid item xs={12} md={8} lg={9}>
						<Paper
							sx={{
								p: 2,
								display: "flex",
								flexDirection: "column",
								height: 240,
							}}>
							<Chart />
						</Paper>
					</Grid> */}
					{/* Recent Deposits */}
					<Grid item xs={12} md={6}>
						<Paper
							sx={{
								p: 2,
								display: "flex",
								flexDirection: "column",
								// height: 240,
							}}>
							<Title>Total Investment Amount</Title>
							<Typography component='p' variant='h4'>
								$3,024.00
							</Typography>
							<Typography color='text.secondary' sx={{ flex: 1 }}>
								as of 15 March, 2019
							</Typography>
						</Paper>
					</Grid>
					<Grid item xs={12} md={6}>
						<Paper
							sx={{
								p: 2,
								display: "flex",
								flexDirection: "column",
								// height: 240,
							}}>
							<Title>Number of Investments</Title>
							<Typography component='p' variant='h4'>
								25
							</Typography>
							<Typography color='text.secondary' sx={{ flex: 1 }}>
								as of 15 March, 2019
							</Typography>
						</Paper>
					</Grid>
					{/* Recent Orders */}
					<Grid item xs={6}>
						<Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
							<Title>Recent Transactions</Title>
							<Table size='small'>
								<TableHead>
									<TableRow>
										<TableCell>Date</TableCell>
										<TableCell>Asset</TableCell>
										<TableCell>Amount</TableCell>
										<TableCell>Action</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{rows.map((row) => (
										<TableRow key={row.id}>
											<TableCell>{row.date}</TableCell>
											<TableCell>{row.asset}</TableCell>
											<TableCell>{row.amount}</TableCell>
											<TableCell>{row.action}</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</Paper>
					</Grid>
					<Grid item xs={6}>
						<Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
							<Title>Recent Transactions</Title>
							Chart will come here
						</Paper>
					</Grid>
				</Grid>
			</Container>
		</div>
	)
}

export default Dashboard
