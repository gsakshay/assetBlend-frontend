/** @format */

import axios from "axios"

const ADMIN_URL = `${process.env.REACT_APP_BASE_URL}/api/admin`

export const getDashboardData = async () => {
	axios.defaults.headers.common[
		"Authorization"
	] = `Bearer ${sessionStorage.getItem("accessToken")}`
	const response = await axios.get(`${ADMIN_URL}/dashboard`)
	return response.data
}

export const getAdvisorRequests = async () => {
	axios.defaults.headers.common[
		"Authorization"
	] = `Bearer ${sessionStorage.getItem("accessToken")}`
	const response = await axios.get(`${ADMIN_URL}/requests`)
	return response.data
}

export const approveAdvisorRequest = async (advisorId) => {
	axios.defaults.headers.common[
		"Authorization"
	] = `Bearer ${sessionStorage.getItem("accessToken")}`
	const response = await axios.post(`${ADMIN_URL}/approve/${advisorId}`)
	return response.data
}

export const rejectAdvisorRequest = async (advisorId) => {
	axios.defaults.headers.common[
		"Authorization"
	] = `Bearer ${sessionStorage.getItem("accessToken")}`
	const response = await axios.delete(`${ADMIN_URL}/reject/${advisorId}`)
	return response.data
}

export const addNewsAsset = async (assetsData) => {
	axios.defaults.headers.common[
		"Authorization"
	] = `Bearer ${sessionStorage.getItem("accessToken")}`
	const response = await axios.post(`${ADMIN_URL}/news`, assetsData)
	return response.data
}
