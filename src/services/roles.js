/** @format */

import axios from "axios"

const ROLES_URL = `${process.env.REACT_APP_BASE_URL}/api/roles`

export const getAllRoles = async () => {
	try {
		const response = await axios.get(`${ROLES_URL}/permitted`)
		return response.data
	} catch (e) {
		console.log(e)
	}
}
