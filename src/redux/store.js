import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import categorySlice from './features/categorySlice';
import querySlice from './features/querySlice';
import contentSlice from './features/contentSlice';

export const store = configureStore({
  reducer: {
    userInfo: userReducer,
    categories:categorySlice,
    queries:querySlice,
    contents:contentSlice
  },
});