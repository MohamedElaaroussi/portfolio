// userSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './rootReducers';
import { UserStateType } from '@/utils/types';

const initialState: UserStateType = {
  users: [],
  filters: {}, // Object representing applied filters
  pagination: {
    page: 1,
    pageSize: 10,
  },
  loading: false,
  error: null,
  totalItems: 0,
};

const userSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
      state.loading = false;
      state.error = null;
    },
    setTotal: (state, action) => {
      state.totalItems = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
    setPagination: (state, action) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    // Selector function to get a user by ID
    selectUserById: (state, action) => {
      state.users = state.users.filter((user: any) => user.id === action.payload);
    },
    deleteUser: (state, action) => {
      // Remove the user from the users by its ID
      state.users = state.users.filter((user: any) => user.id !== action.payload);
      state.totalItems = state.totalItems - 1;

    },
    desactivateUser: (state, action) => {
      const  userId  = action.payload;

      // Find the index of the user in the useres array
      const userIndex = state.users.findIndex((user:any) => user.id === userId);

      // If the user is found, update its status
      if (userIndex !== -1) {
        state.users[userIndex].status = "cancelled";
      }
    },
  },
});

export const { setUsers, setLoading, setError, deleteUser, setFilters, setPagination, setTotal,selectUserById,desactivateUser } = userSlice.actions;
export const selectusers = (state: RootState) => state.users;

export default userSlice.reducer;