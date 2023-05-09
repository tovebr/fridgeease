import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
  isLoggedIn: boolean;
  userId: number | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  userId: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    SET_ACTIVE_USER(state, action) {
      state.isLoggedIn = true;
      state.userId = action.payload;
    },
    REMOVE_ACTIVE_USER(state) {
      state.isLoggedIn = false;
      state.userId = null;
    },
  },
});

export const { SET_ACTIVE_USER, REMOVE_ACTIVE_USER } = authSlice.actions;

export default authSlice.reducer;
