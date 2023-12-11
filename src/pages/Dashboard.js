/** @format */

/** @format */
import * as React from "react"
import RegisteredUser from "../components/dashbords/RegisteredUser"
import AdvisorDashboard from "../components/dashbords/Advisor"
import AdminDashboard from "../components/dashbords/Admin"

// Redux
import { useSelector, useDispatch } from "react-redux"
import {} from "../store/userReducer"
import { setNotification } from "../store/notificationReducer"
import { user_roles } from "../data/constants"

// Services
import {} from "../services/user"
import { useNavigate } from "react-router"

function Dashboard() {
	const dispatch = useDispatch()
	const userRole = "ADMIN"//useSelector((state) => state?.userReducer?.userRole)
	console.log(userRole, "user")
	const navigate = useNavigate()

	return (
		<div>
			{userRole === user_roles.USER && <RegisteredUser />}
			{userRole === user_roles.ADVISOR && <AdvisorDashboard />}
			{userRole === user_roles.ADMIN && <AdminDashboard />}
		</div>
	)
}

export default Dashboard
