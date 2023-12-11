/** @format */

import { Grid } from "@mui/material"
import React, { useState, useEffect } from "react"
import Account from "../components/account/Account"

// Redux
import { useSelector, useDispatch } from "react-redux"
import { setUserProfile, setAuthenticated } from "../store/userReducer"
import { setNotification } from "../store/notificationReducer"

// Services
import { getProfileDetails, updateProfileDetails } from "../services/user"
import { logout as logoutUser } from "../services/auth"
import { useNavigate } from "react-router"

function AccountPage() {
	const dispatch = useDispatch()
	const profileDetails = useSelector((state) => state.userReducer?.profile)

	const navigate = useNavigate()

	const updateFirstName = (value) =>
		dispatch(
			setUserProfile({
				...profileDetails,
				firstName: value,
			})
		)

	const updateLastName = (value) =>
		dispatch(
			setUserProfile({
				...profileDetails,
				lastName: value,
			})
		)

	const updateEmail = (value) =>
		dispatch(
			setUserProfile({
				...profileDetails,
				email: value,
			})
		)

	const updatePhone = (value) =>
		dispatch(
			setUserProfile({
				...profileDetails,
				phone: value,
			})
		)

	const updateAddress = (value) =>
		dispatch(
			setUserProfile({
				...profileDetails,
				address: value,
			})
		)

	const profileActions = {
		updateFirstName,
		updateLastName,
		updateEmail,
		updatePhone,
		updateAddress,
	}

	const updateProfile = async () => {
		const formData = profileDetails

		try {
			const updatedUserData = await updateProfileDetails(formData)
			dispatch(
				setUserProfile({
					...profileDetails,
					...updatedUserData,
				})
			)
			dispatch(
				setNotification({
					severity: "success",
					message: "Profile Details updated Successfully",
				})
			)
		} catch (e) {
			dispatch(
				setNotification({
					severity: "error",
					message: e?.response?.data?.message,
				})
			)
		}
	}

	const getProfileData = async () => {
		try {
			const details = await getProfileDetails()
			dispatch(setUserProfile(details?.userDetails))
		} catch (e) {
			console.log("Could not load profile details", e)
		}
	}

	const logout = async () => {
		try {
			const response = await logoutUser()
			sessionStorage.removeItem("accessToken")
			dispatch(setAuthenticated(false))
			dispatch(
				setNotification({
					severity: "success",
					message: "Logout successful",
				})
			)
			navigate("/signin")
		} catch (e) {
			console.log(e)
			dispatch(
				setNotification({
					severity: "error",
					message: e?.response?.data?.message,
				})
			)
		}
	}

	useEffect(() => {
		getProfileData()
	}, [])

	return (
		<div>
			{/* TODO Dynamically render if its a view only or editing account profile  */}
			<Account
				data={profileDetails}
				action={profileActions}
				updateProfile={updateProfile}
				logout={logout}
			/>
		</div>
	)
}

export default AccountPage
