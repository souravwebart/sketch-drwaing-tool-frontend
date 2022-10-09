import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/Auth";
import messageReducer from "./Slices/Messages";

const reducer = {
  auth: authReducer,
  message: messageReducer,
};

const store = configureStore({
  reducer: reducer,
  devTools: true,
});

export default store;
