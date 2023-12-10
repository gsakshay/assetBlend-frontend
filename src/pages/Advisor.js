import { Grid } from "@mui/material"
import React from "react"
import Title from "../components/Title"
import  AddAdvisor from "../components/advisor/AddAdvisor"
import  ShowAdvisorDetail from "../components/advisor/ShowAdvisorDetail"

function Advisor() {
	return (
		<Grid container spacing={3}>
			<Grid item xs={12} sm={12}>
                <h1>This will show  if user does not have Advisor</h1>
				<AddAdvisor/>
			</Grid>
            <Grid item xs={12} sm={12}>
            <h1>This will show  if user does have Advisor</h1>
				<ShowAdvisorDetail/>
			</Grid>
		</Grid>
	)
}

export default Advisor