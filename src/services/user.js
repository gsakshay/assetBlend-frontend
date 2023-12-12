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
