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
	addAsset: {
		quantity: 1,
		date: "",
		user: {},
	},
	newsAssets: [],
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
		setAddAsset: (state, action) => {
			state.addAsset = {
				...state.addAsset,
				...action.payload,
			}
		},
		setNewsAssets: (state, action) => {
			state.newsAssets = action.payload
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
	setAddAsset,
	setNewsAssets,
} = assetReducer.actions
export default assetReducer.reducer
