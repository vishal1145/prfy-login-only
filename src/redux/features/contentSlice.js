import { createSlice } from "@reduxjs/toolkit";

export const contentSlice = createSlice({
  name: "contents",
  initialState: {
    contents: {},
    message: null,
    loading: false,
  },
  reducers: {
    contents: (state, { payload }) => {
      state.contents = payload;
    },
    loading: (state, { payload }) => {
      state.loading = payload;
    },
    message: (state, { payload }) => {
      state.message = payload;
    },
  },
});

export const { contents, message, loading } = contentSlice.actions;

export default contentSlice.reducer;
