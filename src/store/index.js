/** @format */

import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./userReducer"
import notificationReducer from "./notificationReducer"
const store = configureStore({
	reducer: {
		userReducer,
		notificationReducer,
	},
})

export default store
