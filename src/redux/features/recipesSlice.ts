import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
  searches: any[];
  currentSearchIndex: number;
}

const initialState: InitialState = {
  searches: [],
  currentSearchIndex: -1,
};

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    SET_SEARCH(state, action) {
      state.searches = [...state.searches, action.payload];
    },
    SET_CURRENT_SEARCH_INDEX(state, action) {
      state.currentSearchIndex = action.payload;
    },
  },
});

export const { SET_SEARCH, SET_CURRENT_SEARCH_INDEX } = recipesSlice.actions;

export default recipesSlice.reducer;
