import { UsersFoodItem } from './../../types';
import { createSlice } from '@reduxjs/toolkit';
import { FoodItem, UsersFridge } from '../../types';
import { Timestamp } from 'firebase/firestore';

const initialState: UsersFridge = {
  fridgeId: '',
  foods: [],
};

const fridgeSlice = createSlice({
  name: 'fridge',
  initialState,
  reducers: {
    SET_FRIDGE(state, action) {
      state.foods = action.payload.foods.map((f: UsersFoodItem) => {
        return { ...f, addedAt: f.addedAt };
      });
      state.fridgeId = action.payload.fridgeId;
    },
    EMPTY_FRIDGE(state) {
      state.foods = [];
      state.fridgeId = '';
    },
  },
});

export const { SET_FRIDGE, EMPTY_FRIDGE } = fridgeSlice.actions;

export default fridgeSlice.reducer;
