/** @format */

/** @format */
import React, { useEffect } from "react"
import RegisteredUser from "../components/dashbords/RegisteredUser"
import AdvisorDashboard from "../components/dashbords/Advisor"
import AdminDashboard from "../components/dashbords/Admin"

// Redux
import { useSelector, useDispatch } from "react-redux"
import {
	setAdminDashboard,
	setAdvisorRequests,
	setAdvisorDashboard,
	setAllClients,
	setUserDashboard,
} from "../store/userReducer"
import { setNewsAssets } from "../store/assetReducer"
import { setNotification } from "../store/notificationReducer"
import { user_roles } from "../data/constants"

// Services
import {
	getAdvisorDashboard,
	getAdvisee,
	getClientDashboard,
} from "../services/user"
import {
	getAdvisorRequests,
	getDashboardData as getAdminDashboard,
	approveAdvisorRequest as approveAdvisorRequestService,
	rejectAdvisorRequest as rejectAdvisorRequestService,
} from "../services/admin"
import { getNewsAssets } from "../services/assets"
import { useNavigate } from "react-router"
import { ContactSupportOutlined } from "@mui/icons-material"

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

	// FOR ADVISOR

	const advisorDashboardData = useSelector(
		(state) => state?.userReducer?.advisorDashboardData
	)

	const allClients = useSelector((state) => state.userReducer?.allClients)

	const getAdvisorDashboardData = async () => {
		console.log("Advisor dashboard being called")
		try {
			const response = await getAdvisorDashboard()
			dispatch(setAdvisorDashboard(response?.advisorDashboardData))
			console.log(response, "advisor dashboard")
		} catch (e) {
			console.log(
				"Could not load advisor dashboard",
				e?.response?.data?.messsage
			)
		}
	}

	const getAllAdvisee = async () => {
		try {
			const response = await getAdvisee()
			dispatch(setAllClients(response?.adviseeList))
		} catch (e) {
			console.log("Advisee could not be loaded", e?.response?.data?.message)
		}
	}

	// FOR CLIENT

	const clientDashboardData = useSelector(
		(state) => state?.userReducer?.clientDashboardData
	)

	const getClientDashboardData = async () => {
		try {
			const response = await getClientDashboard()

			// USE the response to get dashboard data

			const cryptos = response?.crypto
			const stocks = response?.stocks

			const totalInvestedAmount = response?.user?.totalInvestedAmount
			const totalAssets = response?.no_of_assets
			const currentWorth =
				parseInt(totalInvestedAmount) + parseInt(response?.overAll_profitLoss)
			const transactions = stocks?.concat(cryptos)

			const dashboardData = {
				totalInvestedAmount,
				totalAssets,
				currentWorth,
				transactions,
			}

			dispatch(setUserDashboard(dashboardData))
		} catch (e) {
			console.log(
				"Could not load client dashboard",
				e?.response?.data?.messsage
			)
		}
	}

	useEffect(() => {
		if (userRole === user_roles.ADMIN) {
			// GET ADMIN DASHBOARD DATA
			getAdminDashboardData()
			getAdvisorsForApproval()
			getAllNewsAssets()
		}

		if (userRole === user_roles.ADVISOR) {
			getAdvisorDashboardData()
			getAllAdvisee()
		}

		if (userRole === user_roles.CLIENT) {
			getClientDashboardData()
		}
	}, [userRole])

	return (
		<div>
			{userRole === user_roles.CLIENT && (
				<RegisteredUser data={clientDashboardData} />
			)}
			{userRole === user_roles.ADVISOR && (
				<AdvisorDashboard data={advisorDashboardData} clients={allClients} />
			)}
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
