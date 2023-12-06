// rootReducers.ts
import { combineReducers } from '@reduxjs/toolkit';
import playerReducer from './playerSlice';
import orderReducer from './orderSlice';
import matchReducer from './matchSlice';
import userReducer from './userSlice';
import authReducer from './authSlice';

const rootReducer = combineReducers({
    players: playerReducer,
    auth: authReducer,
    orders: orderReducer,
    matches: matchReducer,
    users: userReducer,
  // Add other reducers here if you have more slices
});

export default rootReducer;

// RootState type
export type RootState = ReturnType<typeof rootReducer>;