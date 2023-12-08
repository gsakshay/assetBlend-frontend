/** @format */

import { Grid } from "@mui/material"
import React from "react"
import { AccountProfile } from "./AccountProfile"
import { AccountProfileDetails } from "./AccountProfileDetails"

function Account() {
	return (
		<Grid container spacing={3}>
			<Grid item xs={12} sm={4}>
				<AccountProfile />
			</Grid>
			<Grid item xs={12} sm={8}>
				<AccountProfileDetails />
			</Grid>
		</Grid>
	)
}

export default Account
