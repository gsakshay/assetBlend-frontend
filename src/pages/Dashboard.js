/** @format */

/** @format */
import * as React from "react"
import RegisteredUser from "../components/dashbords/RegisteredUser"
import AdvisorDashboard from "../components/dashbords/Advisor"

function Dashboard() {
	return (
		<div>
			{/* TODO: Based on the user role we need to dynamically get the dashbord */}
			<RegisteredUser />
			<h1>Advisor Dashboard (will swap according to role)</h1>
			<AdvisorDashboard/>
		</div>
	)
}

export default Dashboard
