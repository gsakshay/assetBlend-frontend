/** @format */

import { Grid } from "@mui/material"
import React from "react"
import { AccountProfile } from "./AccountProfile"
import { AccountProfileDetails } from "./AccountProfileDetails"

function Account({ data, action, updateProfile, logout }) {
	return (
		<Grid container spacing={3}>
			<Grid item xs={12} sm={4}>
				<AccountProfile
					username={data?.firstName + " " + data?.lastName}
					logout={logout}
				/>
			</Grid>
			<Grid item xs={12} sm={8}>
				<AccountProfileDetails
					data={data}
					action={action}
					updateProfile={updateProfile}
				/>
			</Grid>
		</Grid>
	)
}

export default Account
