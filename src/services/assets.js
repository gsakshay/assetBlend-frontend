/** @format */

import axios from "axios"

const HOME_URL = `${process.env.REACT_APP_BASE_URL}/api/guest`

export const getNewsAssets = async () => {
	const response = await axios.get(`${HOME_URL}`)
	return response.data
}

export const sampleEvaluate = async (params, assetData) => {
	const response = await axios.post(`${HOME_URL}/evaluate`, assetData, {
		params: params,
	})
	return response.data
}
