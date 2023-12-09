/** @format */

import { Grid } from "@mui/material"
import React from "react"
import Title from "../components/Title"
import { SelectAssets } from "../components/assets/SelectAsset"

function Assets() {
	return (
		<Grid container spacing={3}>
			<Grid item xs={12} sm={6}>
				<SelectAssets assetName='Stocks' />
			</Grid>
			<Grid item xs={12} sm={6}>
				<SelectAssets assetName='Crypto' />
			</Grid>
		</Grid>
	)
}

export default Assets
