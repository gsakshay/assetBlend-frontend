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
	userRole: "CLIENT",
	// Registered user details
	clientDashboardData: {},

	// All assets of a single user
	allAssets: [],

	// Advisor Details
	advisorDashboardData: {},
	allClients: [],

	// Admin Details
	adminDashboard: {},
	advisorRequests: [],
	mainPageAssets: [],

	// List of all Advisors
	allAdvisors: [],
	userAdvisor:{}
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
			state.clientDashboardData = {
				...state.clientDashboardData,
				...action.payload,
			}
		},
		setAdvisorDashboard: (state, action) => {
			state.advisorDashboardData = {
				...state.advisorDashboardData,
				...action.payload,
			}
		},
		setAdminDashboard: (state, action) => {
			state.adminDashboard = {
				...state.adminDashboard,
				...action.payload,
			}
		},
		setAdvisorRequests: (state, action) => {
			state.advisorRequests = action.payload
		},
		setAllClients: (state, action) => {
			state.allClients = action.payload
		},
		setAllAdvisor: (state, action) => {
			state.allAdvisors = action.payload
		},
		setUserAdvisor: (state, action) => {
			state.userAdvisor = {
				...state.userAdvisor,
				...action.payload,
			}
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
	setAllClients,
	setAdvisorDashboard,
	setAllAdvisor,
	setUserAdvisor
} = userSlice.actions
export default userSlice.reducer
