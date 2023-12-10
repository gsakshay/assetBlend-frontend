/** @format */

/** @format */
import * as React from "react"
import { useEffect, useState } from 'react';

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
import AssetManagmentBarChart from "../chart/AssetManagmentBarChart";
import UserProfitTrackerTable from "../advisor/UserProfitTrackerTable";

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
	createData(0, "Denn", 20.3, 100.1),
]


function AdvisorDashboard() {
	
const [assetManagmentData, setAssetManagmentData] = useState({ assets: 22, clients: 32 });
	return (
		<div>
			<Grid container spacing={3}>				
				<Grid item md={4} xs={12}>
					<Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
						<Title>Asset Managment</Title>
						<AssetManagmentBarChart {...assetManagmentData} />
					</Paper>
				</Grid>
                <Grid item md={8} xs={12}>
					<Paper sx={{ p: 2, display: "flex", flexDirection: "column", height:338}}>
						<Title>Top Clients</Title>
						<Table size='small'>
							<TableHead>
								<TableRow>
									<TableCell>Name</TableCell>
									<TableCell>Data1</TableCell>
									<TableCell>Data2</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{rows.map((row) => (
									<TableRow key={row.id}>
										<TableCell>{row.name}</TableCell>
										<TableCell>{row.data1}</TableCell>
										<TableCell>{row.data2}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</Paper>
				</Grid>
                <Grid item xs={12} md={12} lg={12}>
						<Paper
							sx={{
								p: 2,
								display: "flex",
								flexDirection: "column",
								height: 240,
							}}>
								<UserProfitTrackerTable/>
						</Paper>
					</Grid>
			</Grid>
		</div>
	)
}

export default AdvisorDashboard
