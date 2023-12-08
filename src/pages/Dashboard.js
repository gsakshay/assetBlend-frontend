/** @format */

/** @format */
import * as React from "react"
import RegisteredUser from "../components/dashbords/RegisteredUser"

function Dashboard() {
	return (
		<div>
			{/* TODO: Based on the user role we need to dynamically get the dashbord */}
			<RegisteredUser />
		</div>
	)
}

export default Dashboard
