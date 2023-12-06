// authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  user: {
    id: any;
    username: string;
    email: string;
    avatar:string;
    role:string;
  } | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};
const storedAuthState = typeof window !== 'undefined' ? localStorage.getItem('authState') : null;
const persistedInitialState: AuthState = storedAuthState
  ? JSON.parse(storedAuthState)
  : initialState;

const authSlice = createSlice({
  name: 'auth',
  initialState: persistedInitialState,
  reducers: {
    loginUserStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginUserSuccess: (state, action: PayloadAction<{ user: any }>) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;

      // Only save relevant parts of the state to localStorage
      if (typeof window !== 'undefined') {
      localStorage.setItem('authState', JSON.stringify({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }));}
    },
    loginUserFailure: (state, action: PayloadAction<{ error: string }>) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload.error;
    },
    logoutUser: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.loading = false;
      state.error = null;

      // Clear the authentication state from localStorage if it's available
      if (typeof window !== 'undefined') {
        localStorage.removeItem('authState');
      }
    },
  },
});

export const {
  loginUserStart,
  loginUserSuccess,
  loginUserFailure,
  logoutUser,
} = authSlice.actions;

export const selectAuth = (state: any) => state.auth.isAuthenticated;
export const selectAuthLoading = (state: any) => state.auth.loading;
export const selectUser = (state: any) => state.auth.user;

export default authSlice.reducer;
