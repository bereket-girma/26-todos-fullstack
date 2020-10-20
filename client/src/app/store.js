import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import dashboardSlice from '../features/dashboard/dashboardSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    dashboard: dashboardSlice,
  },
});
