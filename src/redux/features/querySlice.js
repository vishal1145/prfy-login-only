import { createSlice } from "@reduxjs/toolkit";

export const queriesSlice = createSlice({
  name: "categories",
  initialState: {
    allQueries: [],
    allGroupedQueries: { totalPage: 0, queries: [] },
    suggestions: [],
    keywords: [],
    message: null,
    loading: false,
    userKeywords: [],
    filteredQueries: {},
    afterPitch:{},
    mailPreview:""
  },
  reducers: {
    getAllQueries: (state, { payload }) => {
      state.allQueries = payload;
    },
    getAllGroupedQueries: (state, { payload }) => {
      const { queries, totalPage=1, clear } = payload;
      state.allGroupedQueries = {
        queries: clear
          ? queries
          : [...state.allGroupedQueries.queries, ...queries],
        totalPage,
     
      };
    },
    loading: (state, { payload }) => {
      state.loading = payload;
    },
    error: (state, { payload }) => {
      state.error = payload;
    },
    setMessage: (state, { payload }) => {
      state.message = payload;
    },
    setAfterPitch:(state,{payload})=>{
      state.afterPitch=payload
    },
    getAllSuggestions: (state, { payload }) => {
      state.suggestions = payload.suggestions;
      state.suggestionId = payload.id;
    },
    getAllKeywords: (state, { payload }) => {
      state.keywords = payload;
    },
    userKeywords: (state, { payload }) => {
      state.userKeywords = payload;
    },
    getFilteredQueries: (state, { payload }) => {
      state.filteredQueries = payload;
    },

    getMailPreview:(state,{payload})=>{
      state.mailPreview=payload
    }
  },
});

export const {
  getAllQueries,
  getAllGroupedQueries,
  loading,
  error,
  setMessage,
  getAllSuggestions,
  getAllKeywords,
  userKeywords,
  getFilteredQueries,
  setAfterPitch,
  getMailPreview
} = queriesSlice.actions;

export default queriesSlice.reducer;
