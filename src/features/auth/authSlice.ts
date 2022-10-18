import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
  reducers: {},
});
