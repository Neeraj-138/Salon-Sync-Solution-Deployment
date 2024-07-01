import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import branchReducer from './branchSlice'
// import appointmentReducer from './appointmentSlice';
const store = configureStore({
  reducer: {
    auth: authReducer,
    branch:branchReducer,
    // appointment:appointmentReducer,
  },
});

export default store;
