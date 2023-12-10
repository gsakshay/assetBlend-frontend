/** @format */

import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	profile: {
		_id: "",
		role: "",
		username: "",
		password: "",
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
		address: "",
	},
	isAuthenticated: false,
	rolesAvailable: [],
	// Registered user details
	totalInvestedAmount: 0,
	totalCurrentWorth: 0,
	numberOfInvestments: 0,
	recentTransactions: [],

	// Advisor Details
	totalAssetsOfClients: 0,
	totalClients: 0,
	topClients: [],

	// Admin Details
	totalUsers: 0,
	totalAssets: 0,
	advisorReuests: [],
	mainPageAssets: [],
}

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUserProfile: (state, action) => {
			state.profile = {
				...state.profile,
				...action.payload,
			}
		},
		setRolesAvailable: (state, action) => {
			state.rolesAvailable = action.payload
		},
		setAuthenticated: (state, action) => {
			state.isAuthenticated = action.payload
		},
		setUserDashboard: (state, action) => {
			const {
				totalInvestedAmount,
				totalCurrentWorth,
				numberOfInvestments,
				recentTransactions,
			} = action.payload
			state.totalInvestedAmount = totalInvestedAmount
			state.totalCurrentWorth = totalCurrentWorth
			state.numberOfInvestments = numberOfInvestments
			state.recentTransactions = recentTransactions
		},
		setAdvisorDashboard: (state, action) => {},
	},
})

export const {
	setUserProfile,
	setUserDashboard,
	setRolesAvailable,
	setAuthenticated,
} = userSlice.actions
export default userSlice.reducer
