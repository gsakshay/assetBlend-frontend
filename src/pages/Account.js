/** @format */

import { Grid } from "@mui/material"
import React from "react"
import Account from "../components/account/Account"

function AccountPage() {
	return (
		<div>
			{/* TODO Dynamically render if its a view only or editing account profile  */}
			<Account />
		</div>
	)
}

export default AccountPage
