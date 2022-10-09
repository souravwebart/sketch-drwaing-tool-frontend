import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { setMessage } from "./Messages";

import AuthService from "../Services/authService";

var user;

try {
  user = JSON.parse(localStorage.getItem("user") || "{}");
} catch (e) {
  user = {};
}

export const register = createAsyncThunk(
  "/register",
  async ({ email, password, penColor }: any, thunkAPI) => {
    try {
      const response = await AuthService.register(email, password, penColor);
      thunkAPI.dispatch(setMessage(response.data.message));
      return response.data;
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue("");
    }
  }
);

export const login = createAsyncThunk(
  "/login",
  async ({ email, password }: any, thunkAPI) => {
    try {
      const data = await AuthService.login(email, password);
      return { user: data };
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue("");
    }
  }
);

export const logout = createAsyncThunk("/logout", async () => {
  await AuthService.logout();
});

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [register.fulfilled.toString()]: (state) => {
      state.isLoggedIn = false;
    },
    [register.rejected.toString()]: (state) => {
      state.isLoggedIn = false;
    },
    [login.fulfilled.toString()]: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
    },
    [login.rejected.toString()]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    [logout.fulfilled.toString()]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
  reducers: {},
});

const { reducer } = authSlice;
export default reducer;
