/** @format */

import { Grid } from "@mui/material"
import React, { useEffect } from "react"
import Title from "../components/Title"
import AddAdvisor from "../components/advisor/AddAdvisor"
import { useDispatch, useSelector } from "react-redux"
import { setUserAdvisor } from "../store/userReducer"
import { getProfileDetails } from "../services/user"
import ViewOnlyAccount from "./ViewOnlyAccount"
import { useNavigate } from "react-router"

function Advisor() {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const getUserData = async () => {
		try {
			const details = await getProfileDetails()
			dispatch(setUserAdvisor(details?.userDetails))
		} catch (e) {
			console.log("Could not load profile details", e)
		}
	}

	const userAdvisorDetail = useSelector(
		(state) => state?.userReducer?.userAdvisor.advisor
	)
	// console.log("SSS:",userAdvisorDetail)

	const userRole = useSelector((state) => state?.userReducer?.userRole)

	useEffect(() => {
		getUserData()
	}, [userRole])

	useEffect(() => {}, [userAdvisorDetail])
	if (userAdvisorDetail?._id) {
		navigate(`/app/account/${userAdvisorDetail?._id}`)
	}

	return (
		<Grid container spacing={3}>
			{!userAdvisorDetail?._id ? (
				<Grid item xs={12} sm={12}>
					<AddAdvisor />
				</Grid>
			) : (
				<p>Loading Advisor!</p>
			)}
		</Grid>
	)
}

export default Advisor
