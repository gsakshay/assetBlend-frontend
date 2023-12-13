/** @format */

/** @format */
import React, { useEffect } from "react"
import RegisteredUser from "../components/dashbords/RegisteredUser"
import AdvisorDashboard from "../components/dashbords/Advisor"
import AdminDashboard from "../components/dashbords/Admin"

// Redux
import { useSelector, useDispatch } from "react-redux"
import { setAdminDashboard, setAdvisorRequests } from "../store/userReducer"
import { setNewsAssets } from "../store/assetReducer"
import { setNotification } from "../store/notificationReducer"
import { user_roles } from "../data/constants"

// Services
import {} from "../services/user"
import {
	getAdvisorRequests,
	getDashboardData as getAdminDashboard,
	approveAdvisorRequest as approveAdvisorRequestService,
	rejectAdvisorRequest as rejectAdvisorRequestService,
	addNewsAsset,
} from "../services/admin"
import { getNewsAssets } from "../services/assets"
import { useNavigate } from "react-router"

function Dashboard() {
	const dispatch = useDispatch()

	const userRole = useSelector((state) => state?.userReducer?.userRole)

	// DATA FOR ADMIN
	const adminDashboardData = useSelector(
		(state) => state?.userReducer?.adminDashboard
	)
	const advisorRequests = useSelector(
		(state) => state?.userReducer?.advisorRequests
	)
	const newsAssets = useSelector((state) => state?.assetReducer?.newsAssets)

	const navigate = useNavigate()

	const getAdminDashboardData = async () => {
		try {
			const response = await getAdminDashboard()
			dispatch(setAdminDashboard(response?.dashboardData))
		} catch (e) {
			console.log("Could not fetch admin dashboard")
		}
	}

	const getAdvisorsForApproval = async () => {
		try {
			// setAdvisorRequests
			const response = await getAdvisorRequests()
			dispatch(setAdvisorRequests(response?.requests))
		} catch (e) {
			console.log("Could not fetch admin dashboard")
		}
	}

	const approveAdvisorRequest = async (advisorId) => {
		try {
			const response = await approveAdvisorRequestService(advisorId)
			getAdvisorsForApproval()
			dispatch(
				setNotification({
					severity: "success",
					message: "Advisor Approved!",
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
	const rejectAdvisorRequest = async (advisorId) => {
		try {
			const response = await rejectAdvisorRequestService(advisorId)
			getAdvisorsForApproval()
			dispatch(
				setNotification({
					severity: "warning",
					message: "Advisor Rejected!",
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

	const getAllNewsAssets = async () => {
		try {
			const response = await getNewsAssets()
			dispatch(setNewsAssets(response))
		} catch (e) {
			console.log("Could not load news assets", e?.response?.data?.message)
		}
	}

	useEffect(() => {
		if (userRole === user_roles.ADMIN) {
			// GET ADMIN DASHBOARD DATA
			getAdminDashboardData()
			getAdvisorsForApproval()
			getAllNewsAssets()
		}
	}, [userRole])

	return (
		<div>
			{userRole === user_roles.CLIENT && <RegisteredUser />}
			{userRole === user_roles.ADVISOR && <AdvisorDashboard />}
			{userRole === user_roles.ADMIN && (
				<AdminDashboard
					data={adminDashboardData}
					requests={advisorRequests}
					newsAssets={newsAssets}
					approveAdvisor={approveAdvisorRequest}
					rejectAdvisor={rejectAdvisorRequest}
				/>
			)}
		</div>
	)
}

export default Dashboard
