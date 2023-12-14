/** @format */

import { Grid } from "@mui/material"
import React, { useState, useEffect } from "react"
import Account from "../components/account/Account"

import { useSelector, useDispatch } from "react-redux"
import { setVisitorProfile } from "../store/userReducer"

// Services
import { visitProfileDetails } from "../services/user"
import { useParams } from "react-router"
import { ROAccountDetails } from "../components/account/ROAccountDetails"

function AccountPage() {
	const dispatch = useDispatch()
	const profileDetails = useSelector((state) => state.userReducer?.userAdvisor.advisor)
console.log("Deep:",profileDetails)
	const { accountId } = useParams()

	const getProfileData = async () => {
		try {
			const details = await visitProfileDetails(accountId)
			dispatch(setVisitorProfile(details?.userDetails))
		} catch (e) {
			console.log("Could not load profile details", e)
		}
	}

	useEffect(() => {
		getProfileData()
	}, [])

	return (
		<div>
			{/* TODO Dynamically render if its a view only or editing account profile  */}
			<ROAccountDetails data={profileDetails} />
		</div>
	)
}

export default AccountPage
