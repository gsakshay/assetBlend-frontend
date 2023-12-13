/** @format */

/** @format */
import * as React from "react"
import { useEffect, useState } from "react"

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
import AssetManagmentBarChart from "../chart/AssetManagmentBarChart"
import UserProfitTrackerTable from "../advisor/UserProfitTrackerTable"

function AdvisorDashboard({ data, clients }) {
	return (
		<div>
			<Grid container spacing={3}>
				<Grid item md={4} xs={12}>
					<Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
						<Title>Asset Managment</Title>
						<AssetManagmentBarChart {...data} />
					</Paper>
				</Grid>
				<Grid item md={8} xs={12}>
					<Paper
						sx={{
							p: 2,
							display: "flex",
							flexDirection: "column",
							height: 338,
						}}>
						<Title>Top Clients</Title>
						<Table size='small'>
							<TableHead>
								<TableRow>
									<TableCell>First Name</TableCell>
									<TableCell>Last Name</TableCell>
									<TableCell>Email</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{clients?.map((row) => (
									<TableRow key={row?._id}>
										<TableCell>{row?.firstName}</TableCell>
										<TableCell>{row?.lastName}</TableCell>
										<TableCell>{row?.email}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</Paper>
				</Grid>
				{/* <Grid item xs={12} md={12} lg={12}>
					<Paper
						sx={{
							p: 2,
							display: "flex",
							flexDirection: "column",
							height: 240,
						}}>
						<UserProfitTrackerTable />
					</Paper>
				</Grid> */}
			</Grid>
		</div>
	)
}

export default AdvisorDashboard
