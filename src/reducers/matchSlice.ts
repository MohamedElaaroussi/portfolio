// matchSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './rootReducers';
import { Match, MatchStateType } from '@/utils/types';

const initialState: MatchStateType = {
  matches: [],
  filters: {}, // Object representing applied filters
  pagination: {
    page: 1,
    pageSize: 10,
  },
  loading: false,
  error: null,
  totalItems: 0,
  search: null,
  hosts: [],
};

const matchSlice = createSlice({
  name: 'matches',
  initialState: initialState,
  reducers: {
    setMatches: (state, action) => {
      state.matches = action.payload;
      state.loading = false;
      state.error = null;
    },
    setHosts: (state, action) => {
      state.hosts = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setTotal: (state, action) => {
      state.totalItems = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setPagination: (state, action) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    deleteMatch: (state, action) => {
      // Remove the match from the list by its ID
      state.matches = state.matches.filter((match: Match) => match.id !== action.payload);
      state.totalItems = state.totalItems - 1;
    },
    desactivateMatch: (state, action) => {
      const matchId  = action.payload;

      // Find the index of the match in the matches array
      const matchIndex = state.matches.findIndex((match: Match) => match.id === matchId);

      // If the match is found, update its status
      if (matchIndex !== -1) {
        // Make an immutable update to the state
        const updatedMatches = [
          ...state.matches.slice(0, matchIndex),
          { ...state.matches[matchIndex], status: "cancelled" },
          ...state.matches.slice(matchIndex + 1),
        ];
        return {
          ...state,
          matches: updatedMatches,
        };
      }
    },
    addmatch: (state, action) => {
      // Add the new match to the list
      state.matches.push(action.payload);
      state.totalItems = state.totalItems + 1;
    },
  },
});

export const { setMatches, setFilters, setPagination, setLoading, setError, setTotal, desactivateMatch, deleteMatch, setSearch, setHosts, addmatch } = matchSlice.actions;
export const selectmatches = (state: RootState) => state.matches;


export default matchSlice.reducer;