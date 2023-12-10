/** @format */

import axios from "axios"

const ACCOUNT_URL = `${process.env.REACT_APP_BASE_URL}/api/account`
const USER_URL = `${process.env.REACT_APP_BASE_URL}/api/user`

export const getProfileDetails = async () => {
	axios.defaults.headers.common[
		"Authorization"
	] = `Bearer ${sessionStorage.getItem("accessToken")}`
	const response = await axios.get(`${ACCOUNT_URL}`)
	return response.data
}

export const updateProfileDetails = async (userData) => {
	axios.defaults.headers.common[
		"Authorization"
	] = `Bearer ${sessionStorage.getItem("accessToken")}`
	const response = await axios.post(`${ACCOUNT_URL}/editDetails`, userData)
	return response.data
}
