import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice"; // adjust path if needed

const store = configureStore({
  reducer: {
    auth: authReducer, // ✅ THIS FIXES THE ERROR
  },
});

export default store;
