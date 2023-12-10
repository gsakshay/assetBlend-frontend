/** @format */

import { Divider, Grid, Typography } from "@mui/material"
import React from "react"
import Title from "../components/Title"
import { SelectAssets } from "../components/assets/SelectAsset"
import AssetsTable from "../components/assets/AssetsTable"
import PropTypes from "prop-types"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Box from "@mui/material/Box"

function TabPanel(props) {
	const { children, value, index, ...other } = props

	console.log("pannel")
	console.log(children, value, index)
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
					<SelectAssets assetName='Stocks' />
				</Grid>
				<Grid item xs={12} sm={6}>
					<SelectAssets assetName='Crypto' />
				</Grid>
			</Grid>
			<Divider />
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
			<AssetsTable />
			<Divider />
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
					aria-label='Vertical tabs example'
					sx={{ borderRight: 1, borderColor: "divider" }}>
					<Tab label='Item One' />
					<Tab label='Item Two' />
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
	)
}

export default Assets
