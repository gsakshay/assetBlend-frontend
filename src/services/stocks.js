/** @format */

import axios from "axios"

const STOCKS_URL = `${process.env.REACT_APP_BASE_URL}/api/stocks`

export const getAllStocks = async (query) => {
	// structure of query should be {name: value}
	axios.defaults.headers.common[
		"Authorization"
	] = `Bearer ${sessionStorage.getItem("accessToken")}`
	const response = await axios.get(
		`${STOCKS_URL}`,
		{},
		{
			params: query,
		}
	)
	return response.data
}

export const getParticularStock = async (stockId) => {
	axios.defaults.headers.common[
		"Authorization"
	] = `Bearer ${sessionStorage.getItem("accessToken")}`
	const response = await axios.get(`${STOCKS_URL}/${stockId}`)
	return response.data
}
