/** @format */

import axios from "axios"

const AUTH_URL = `${process.env.REACT_APP_BASE_URL}/api/auth`

export const signup = async (userData) => {
	const response = await axios.post(`${AUTH_URL}/register`, userData)
	return response.data
}

export const signin = async (userDate) => {
	const response = await axios.post(`${AUTH_URL}/login`, userDate)
	return response.data
}

export const logout = async () => {
	axios.defaults.headers.common[
		"Authorization"
	] = `Bearer ${sessionStorage.getItem("accessToken")}`

	const response = await axios.post(`${AUTH_URL}/logout`)
	return response.data
}
