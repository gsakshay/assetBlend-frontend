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
	choosenAsset: null,
	stockDetail: {},
	cryptoDetail: {},
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
		setStockDetail: (state, action) => {
			state.stockDetail = action.payload
		},
		setCryptoDetail: (state, action) => {
			state.cryptoDetail = action.payload
		},
		setChoosenAsset: (state, action) => {
			state.choosenAsset = action.payload
		},
	},
})

export const {
	setStocksSearch,
	setStocksResult,
	setCryptoSearch,
	setCryptoResult,
	setStockDetail,
	setCryptoDetail,
	setChoosenAsset,
} = assetReducer.actions
export default assetReducer.reducer
