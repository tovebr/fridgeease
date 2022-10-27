import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../redux/features/authSlice';
import fridgeReducer from '../redux/features/fridgeSlice';

export const rootReducer = combineReducers({
  auth: authReducer,
  fridge: fridgeReducer,
});
