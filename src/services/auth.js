/** @format */

import axios from "axios"

const AUTH_URL = `${process.env.REACT_APP_BASE_URL}/api/auth`

export const signup = async (userDate) => {
	const response = await axios.post(`${AUTH_URL}/register`, userDate)
	return response.data
}
