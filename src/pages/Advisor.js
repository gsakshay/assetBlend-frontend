import { Grid } from "@mui/material"
import React, { useEffect } from "react"
import Title from "../components/Title"
import  AddAdvisor from "../components/advisor/AddAdvisor"
import  ShowAdvisorDetail from "../components/advisor/ShowAdvisorDetail"
import { useDispatch, useSelector } from "react-redux"
import { setAdminDashboard, setAllAdvisor, setUserAdvisor, setUserProfile } from "../store/userReducer"
import { getAllAdvisor, getProfileDetails } from "../services/user"
import  ViewOnlyAccount from "./ViewOnlyAccount"


function Advisor() {
	const dispatch = useDispatch()


	const getUserData = async () => {
		try {
			const details = await getProfileDetails()
			dispatch(setUserAdvisor(details?.userDetails))
		} catch (e) {
			console.log("Could not load profile details", e)
		}
	}

	const userAdvisorDetail = useSelector((state) => state?.userReducer?.userAdvisor.advisor)
	// console.log("SSS:",userAdvisorDetail)

	const userRole = useSelector((state) => state?.userReducer?.userRole)
	
	useEffect(() => {
		getUserData()
	}, [userRole])
	
	return (
		<Grid container spacing={3}>
			{
				userAdvisorDetail === null && (
					<Grid item xs={12} sm={12}>
                		<AddAdvisor/>
					</Grid>
				)
			}

			{
				userAdvisorDetail != null && (
					<Grid item xs={12} sm={12}>
						<ViewOnlyAccount />
					</Grid>
				)
			}
		</Grid>
	)
}

export default Advisor