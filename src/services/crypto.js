/** @format */

import axios from "axios"

const CRYPTO_URL = `${process.env.REACT_APP_BASE_URL}/api/crypto`
const TICKER_URL = `${process.env.REACT_APP_BASE_URL}/api/ticker`

export const getAllCrypto = async (query) => {
	// structure of query should be {name: value}
	axios.defaults.headers.common[
		"Authorization"
	] = `Bearer ${sessionStorage.getItem("accessToken")}`
	const response = await axios.get(`${CRYPTO_URL}`, {
		params: query,
	})
	return response.data
}

export const getParticularCrypto = async (cryptoId) => {
	axios.defaults.headers.common[
		"Authorization"
	] = `Bearer ${sessionStorage.getItem("accessToken")}`
	const response = await axios.get(`${TICKER_URL}/${cryptoId}`, {
		params: { type: "crypto" },
	})
	return response.data
}
