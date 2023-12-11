/** @format */

import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	stocks: {
		search: "",
		results: [],
	},
	crypto: {
		search: "",
		results: [],
	},
}

const assetReducer = createSlice({
	name: "asset",
	initialState,
	reducers: {
		setStocksSearch: (state, action) => {
			state.stocks.search = action.payload
		},
		setStocksResult: (state, action) => {
			state.stocks.results = action.payload
		},
		setCryptoSearch: (state, action) => {
			state.crypto.search = action.payload
		},
		setCryptoResult: (state, action) => {
			state.crypto.results = action.payload
		},
	},
})

export const {
	setStocksSearch,
	setStocksResult,
	setCryptoSearch,
	setCryptoResult,
} = assetReducer.actions
export default assetReducer.reducer
