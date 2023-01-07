import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: false,
    error: null,
    loadUserLoading: false,
    isAuthenticated: false,
    freshInstall: true,
  },
  reducers: {
    login: (state, { payload }) => {
      state.user = payload.user;
      state.emailSignature = payload.emailSignature;
    },
    setEmailSignature: (state, { payload }) => {
      state.emailSignature = payload;
    },
    setIsAuthenticated: (state, { payload }) => {
      state.isAuthenticated = payload;
    },
    setIsFreshInstall: (state, { payload }) => {
      state.freshInstall = payload;
    },
    loading: (state, { payload }) => {
      state.loading = payload;
    },
    loadUserLoading: (state, { payload }) => {
      state.loadUserLoading = payload;
    },
    logout: (state) => {
      state.user = null;
    },
    error: (state, { payload }) => {
      state.error = payload;
    },
    message: (state, { payload }) => {
      state.message = payload;
    },
    clearErrors: (state) => {
      state.error = null;
    },
  },
});

export const {
  login,
  logout,
  loading,
  error,
  clearErrors,
  message,
  loadUserLoading,
  setIsAuthenticated,
  setIsFreshInstall,
  setEmailSignature,
} = userSlice.actions;

// selectors
export const selectUser = (state) => state.userInfo.user;

export default userSlice.reducer;
