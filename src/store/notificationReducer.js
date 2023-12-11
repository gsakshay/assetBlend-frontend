/** @format */

import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	alert: {
		open: false,
		severity: "",
		message: "",
	},
}

const notificationSlice = createSlice({
	name: "notification",
	initialState,
	reducers: {
		setNotification: (state, action) => {
			const { severity, message } = action.payload
			state.alert = {
				...state.alert,
				open: true,
				severity,
				message,
			}
		},
		closeNotification: (state, action) => {
			state.alert = {
				...state.alert,
				open: false,
			}
		},
	},
})

export const { setNotification, closeNotification } = notificationSlice.actions
export default notificationSlice.reducer
