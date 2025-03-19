import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    signInSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.currentUser = action.payload;
    },
    signInError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    startUpdateUserInfo: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    updateUserInfoSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
    },
    updateUserInfoError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state, action) => {
      state.currentUser = null;
      state.error = null;
      state.loading = false;
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInError,
  startUpdateUserInfo,
  updateUserInfoSuccess,
  updateUserInfoError,
  logout,
} = userSlice.actions;

export default userSlice.reducer;
