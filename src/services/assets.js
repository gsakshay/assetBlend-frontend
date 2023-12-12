/** @format */

import axios from "axios"

const HOME_URL = `${process.env.REACT_APP_BASE_URL}/api/guest`

export const getNewsAssets = async () => {
	axios.defaults.headers.common[
		"Authorization"
	] = `Bearer ${sessionStorage.getItem("accessToken")}`
	const response = await axios.get(`${HOME_URL}`)
	return response.data
}
