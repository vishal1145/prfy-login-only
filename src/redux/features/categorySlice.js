import { createSlice } from "@reduxjs/toolkit";

export const categorySlice = createSlice({
  name: "categories",
  initialState: {
    allCategories: [],
    userCategories: [],
    // confirmation:false,
  },
  reducers: {
    getAllCategories: (state, { payload }) => {
      state.allCategories = payload;
    },

    getAllUserCategories: (state, { payload }) => {
      state.userCategories = payload;
    },
    // forgotPassword:(state, {payload}) => {
    //   state.confirmation = payload;
    // }
  },
});

export const { getAllCategories, getAllUserCategories } = categorySlice.actions;


export default categorySlice.reducer;
