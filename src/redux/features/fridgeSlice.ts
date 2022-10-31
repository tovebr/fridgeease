import { createSlice } from '@reduxjs/toolkit';
import { FoodItem, UsersFridge, UsersFoodItem } from '../../types';
import { Timestamp } from 'firebase/firestore';

const initialState: UsersFridge = {
  fridgeId: '',
  foods: [],
};

const calcDaysLeft = (expirationDate: Date) => {
  const now = new Date();
  const differenceInDays =
    Math.floor(
      (expirationDate.getTime() - now.getTime()) / (1000 * 3600 * 24)
    ) + 1;
  return differenceInDays;
};

const fridgeSlice = createSlice({
  name: 'fridge',
  initialState,
  reducers: {
    SET_FRIDGE(state, action) {
      const tempFridge = action.payload.foods.map((f: any) => {
        return {
          ...f,
          addedAt: f.addedAt.toDate(),
          expirationDate: f.expirationDate.toDate(),
          daysLeft: calcDaysLeft(f.expirationDate.toDate()),
        };
      });
      state.foods = tempFridge.sort((a: UsersFoodItem, b: UsersFoodItem) => {
        let returnValue: number;
        if (a.daysLeft && b.daysLeft) {
          returnValue = a.daysLeft - b.daysLeft;
        } else {
          returnValue = 0;
        }
        return returnValue;
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
