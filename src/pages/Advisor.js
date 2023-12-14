import { Grid } from "@mui/material"
import React, { useEffect } from "react"
import Title from "../components/Title"
import  AddAdvisor from "../components/advisor/AddAdvisor"
import  ShowAdvisorDetail from "../components/advisor/ShowAdvisorDetail"
import { useDispatch, useSelector } from "react-redux"
import { setAdminDashboard, setAllAdvisor } from "../store/userReducer"
import { getAllAdvisor } from "../services/user"

function Advisor() {
	const dispatch = useDispatch()

	const getAllAdvisorData= async () => {
		// try {
		// 	const response = await getAllAdvisor()
		// 	console.log("LOL"+response.userDetails)
		// 	dispatch(setAllAdvisor(response?.userDetails))
		// } catch (e) {
		// 	console.log("Could not fetch admin dashboard"+e)
		// }
	}

	const userRole = useSelector((state) => state?.userReducer?.userRole)
	
	useEffect(() => {
		getAllAdvisorData()
	}, [userRole])
	
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