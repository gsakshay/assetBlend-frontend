/** @format */

import React from "react"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import Title from "../components/Title"
import Button from "@mui/material/Button"
import {
	Typography,
} from "@mui/material"
import AssetsChart from "../components/chart/AssetsChart"

function AssetDetail() {
	return <div>
		<div>
			<Grid container spacing={3}>
			<Grid item xs={12} md={12} lg={12}>
					<Paper
						sx={{
							p: 2,
							display: "flex",
							flexDirection: "column",
						}}>
						<Title>Amazon</Title>
						<Typography component='p' variant='h4'>
							$250
						</Typography>
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

				{/* Buttons */}
				<Grid item xs={12} md={6}>
						<Button
						// onClick={() => navigate(`/app/dashboard`)}
						type='submit'
						fullWidth
						variant='contained'
						color='primary'
						sx={{ mt: 1, mb: 0 }}>
						Add Asset
						</Button>
				</Grid>
				<Grid item xs={12} md={6}>
						<Button
						// onClick={() => navigate(`/app/dashboard`)}
						type='submit'
						fullWidth
						variant='contained'
						color='primary'
						sx={{ mt: 1, mb: 0 }}>
						Sell Asset
						</Button>
				</Grid>
			</Grid>
		</div>
	</div>
}

export default AssetDetail
