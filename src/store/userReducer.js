/** @format */

import { createSlice } from "@reduxjs/toolkit"

const roles = {
	CLIENT: "CLIENT",
	ADVISOR: "ADVISOR",
	ADMIN: "ADMIN",
}

const initialState = {
	profile: {
		id: "",
		role: "",
		username: "testuser",
		password: "test",
		firstName: "Test",
		lastName: "User",
		email: "test@gmail.com",
		phone: "8887779999",
		address: "Longwood Ave",
	},
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
			state.profile = action.payload
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

export const { setUserProfile, setUserDashboard } = userSlice.actions
export default userSlice.reducer
