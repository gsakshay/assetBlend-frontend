/** @format */

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userReducer";
import notificationReducer from "./notificationReducer";
import assetReducer from "./assetReducer";
const store = configureStore({
  reducer: {
    userReducer,
    assetReducer,
    notificationReducer,
  },
});

export default store;
