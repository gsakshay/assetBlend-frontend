/** @format */

import axios from "axios"

const ACCOUNT_URL = `${process.env.REACT_APP_BASE_URL}/api/account`
const USER_URL = `${process.env.REACT_APP_BASE_URL}/api/user`
const ADVISOR_URL = `${process.env.REACT_APP_BASE_URL}/api/advisors`

export const getProfileDetails = async () => {
	axios.defaults.headers.common[
		"Authorization"
	] = `Bearer ${sessionStorage.getItem("accessToken")}`
	const response = await axios.get(`${ACCOUNT_URL}`)
	return response.data
}

export const visitProfileDetails = async (user_id) => {
	axios.defaults.headers.common[
		"Authorization"
	] = `Bearer ${sessionStorage.getItem("accessToken")}`
	const response = await axios.get(`${ACCOUNT_URL}/${user_id}`)
	return response.data
}

export const updateProfileDetails = async (userData) => {
	axios.defaults.headers.common[
		"Authorization"
	] = `Bearer ${sessionStorage.getItem("accessToken")}`
	const response = await axios.post(`${ACCOUNT_URL}/editDetails`, userData)
	return response.data
}

// Get all assets for the user:

export const getAllAssets = async () => {
	axios.defaults.headers.common[
		"Authorization"
	] = `Bearer ${sessionStorage.getItem("accessToken")}`
	const response = await axios.get(`${USER_URL}/assets`)
	return response.data
}

// Add an asset for the user

export const addAsset = async (assetData) => {
	axios.defaults.headers.common[
		"Authorization"
	] = `Bearer ${sessionStorage.getItem("accessToken")}`
	const response = await axios.post(`${USER_URL}/assets`, assetData)
	return response.data
}

// Sell an aasset

export const sellAsset = async (assetId) => {
	axios.defaults.headers.common[
		"Authorization"
	] = `Bearer ${sessionStorage.getItem("accessToken")}`
	const response = await axios.post(`${USER_URL}/assets/${assetId}`)
	return response.data
}

export const getClientDashboard = async () => {
	axios.defaults.headers.common[
		"Authorization"
	] = `Bearer ${sessionStorage.getItem("accessToken")}`
	const response = await axios.get(`${USER_URL}/dashboard`)
	return response.data
}

// Get list of all advisor

export const getAllAdvisor = async () => {
	axios.defaults.headers.common[
		"Authorization"
	] = `Bearer ${sessionStorage.getItem("accessToken")}`
	const response = await axios.get(`${ADVISOR_URL}`)
	return response.data
}

// Assign or change Advisor to the user

export const assignAdvisor = async (advisorId) => {
	axios.defaults.headers.common[
		"Authorization"
	] = `Bearer ${sessionStorage.getItem("accessToken")}`
	const response = await axios.post(`${USER_URL}/addAdvisor/${advisorId}`)
	return response.data
}




// For an advisor
// Get all advisee

export const getAdvisee = async () => {
	axios.defaults.headers.common[
		"Authorization"
	] = `Bearer ${sessionStorage.getItem("accessToken")}`
	const response = await axios.get(`${ADVISOR_URL}/advisee`)
	return response.data
}

export const getAdviseeAsset = async (adviseeId) => {
	axios.defaults.headers.common[
		"Authorization"
	] = `Bearer ${sessionStorage.getItem("accessToken")}`
	const response = await axios.get(`${ADVISOR_URL}/assets/${adviseeId}`)
	return response.data
}

export const sellAssetForAdvisee = async (assetId) => {
	axios.defaults.headers.common[
		"Authorization"
	] = `Bearer ${sessionStorage.getItem("accessToken")}`
	const response = await axios.post(`${ADVISOR_URL}/sell/assets/${assetId}`)
	return response.data
}

export const addAssetForAdvisee = async (adviseeId, assetData) => {
	axios.defaults.headers.common[
		"Authorization"
	] = `Bearer ${sessionStorage.getItem("accessToken")}`
	const response = await axios.post(
		`${ADVISOR_URL}/buy/${adviseeId}/assets`,
		assetData
	)
	return response.data
}

export const getAdvisorDashboard = async () => {
	axios.defaults.headers.common[
		"Authorization"
	] = `Bearer ${sessionStorage.getItem("accessToken")}`
	const response = await axios.get(`${ADVISOR_URL}/dashboard`)
	return response.data
}
