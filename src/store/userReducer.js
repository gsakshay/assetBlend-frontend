/** @format */

import { createSlice } from "@reduxjs/toolkit";

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
	visitProfile: {
		_id: "",
		role: "",
		username: "",
		firstName: "",
		lastName: "",
		email: "",
	},
	isAuthenticated: false,
	rolesAvailable: [],
	userRole: "ADMIN",
	// Registered user details
	totalInvestedAmount: 0,
	totalCurrentWorth: 0,
	numberOfInvestments: 0,
	recentTransactions: [],

	// All assets of a single user
	allAssets: [],

	// Advisor Details
	totalAssetsOfClients: 0,
	totalClients: 0,
	allClients: [],
  
	// Admin Details
	adminDashboard: {},
	advisorRequests: [],
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
		setAuthenticatedUserRole: (state, action) => {
			state.userRole = action.payload
		},
		setVisitorProfile: (state, action) => {
			state.visitProfile = {
				...state.visitProfile,
				...action.payload,
			}
		},
		setAllAssets: (state, action) => {
			state.allAssets = action.payload
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
		setAdminDashboard: (state, action) => {
			state.adminDashboard = {
				...state.adminDashboard,
				...action.payload,
			}
		},
		setAdvisorRequests: (state, action) => {
			state.advisorRequests = action.payload
		},
	},
})

export const {
	setUserProfile,
	setUserDashboard,
	setRolesAvailable,
	setAuthenticated,
	setVisitorProfile,
	setAuthenticatedUserRole,
	setAllAssets,
	setAdminDashboard,
	setAdvisorRequests,
} = userSlice.actions
export default userSlice.reducer