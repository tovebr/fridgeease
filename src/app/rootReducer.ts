import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../redux/features/authSlice';
import fridgeReducer from '../redux/features/fridgeSlice';
import recipesReducer from '../redux/features/recipesSlice';

export const rootReducer = combineReducers({
  auth: authReducer,
  fridge: fridgeReducer,
  recipes: recipesReducer,
});
