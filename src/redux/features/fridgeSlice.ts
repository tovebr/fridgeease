import { createSlice } from '@reduxjs/toolkit';
import { FoodItem, UsersFridge, UsersFoodItem } from '../../types';
import { Timestamp } from 'firebase/firestore';

const initialState: UsersFridge = {
  fridgeId: '',
  foods: [],
  savedRecipes: [],
  shoppingList: [],
};

const calcDaysLeft = (expirationDate: Date) => {
  const now = new Date();
  const differenceInDays =
    Math.floor(
      (expirationDate.getTime() - now.getTime()) / (1000 * 3600 * 24)
    ) + 1;
  return differenceInDays;
};

const createFoodItems = (foodArr: any) => {
  return foodArr.map((f: any) => {
    return {
      ...f,
      addedAt: f.addedAt.toDate(),
      expirationDate: f.expirationDate.toDate(),
      daysLeft: calcDaysLeft(f.expirationDate.toDate()),
    };
  });
};

const fridgeSlice = createSlice({
  name: 'fridge',
  initialState,
  reducers: {
    SET_FRIDGE(state, action) {
      if (action.payload.foods.length > 0) {
        const tempFridge = createFoodItems(action.payload.foods);
        state.foods = tempFridge.sort((a: UsersFoodItem, b: UsersFoodItem) => {
          let returnValue: number;
          if (a.daysLeft && b.daysLeft) {
            returnValue = a.daysLeft - b.daysLeft;
          } else {
            returnValue = 0;
          }
          return returnValue;
        });
      } else {
        state.foods = action.payload.foods;
      }
      state.fridgeId = action.payload.fridgeId;
      state.savedRecipes = action.payload.savedRecipes;
      state.shoppingList = action.payload.shoppingList;
    },
    EMPTY_FRIDGE(state) {
      state.foods = [];
      state.fridgeId = '';
      state.savedRecipes = [];
      state.shoppingList = [];
    },
  },
});

export const { SET_FRIDGE, EMPTY_FRIDGE } = fridgeSlice.actions;

export default fridgeSlice.reducer;
