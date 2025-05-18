// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import insuranceReducer from './slices/insuranceSlice';
import authReducer from './slices/authSlice';

const store = configureStore({
  reducer: {
    insurance: insuranceReducer,
    auth: authReducer,
  },
});

export default store;
