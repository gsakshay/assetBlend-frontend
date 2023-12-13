/** @format */

import { AppBar, Toolbar, Typography } from "@mui/material"
import PaidIcon from "@mui/icons-material/Paid"
import React from "react"

function CustomAppBar() {
	return (
		<AppBar position='relative'>
			<Toolbar>
				<PaidIcon sx={{ mr: 2 }} />
				<Typography variant='h6' color='inherit' noWrap>
					Asset Alchemy
				</Typography>
			</Toolbar>
		</AppBar>
	)
}

export default CustomAppBar
