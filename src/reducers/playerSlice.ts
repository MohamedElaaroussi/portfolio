// playerSlice.js
import { Player, PlayerStateType } from '@/utils/types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './rootReducers';

const initialState: PlayerStateType = {
  players: [],
  filters: {}, // Object representing applied filters
  pagination: {
    page: 1,
    pageSize: 10,
  },
  loading: false,
  error: null,
  totalItems: 0,
};

const playerSlice = createSlice({
  name: 'players',
  initialState: initialState,
  reducers: {
    setPlayers: (state, action) => {
      state.players = action.payload;
      state.loading = false;
      state.error = null;
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
    setPagination: (state, action) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    // Selector function to get a player by ID
    selectPlayerById: (state, action) => {
      state.players = state.players.filter((player: Player) => player.id === action.payload);
    },
    deletePlayer: (state, action) => {
      // Remove the player from the list by its ID
      state.players = state.players.filter((player: Player) => player.id !== action.payload);
      state.totalItems = state.totalItems - 1;
    },
    // desactivatePlayer: (state, action) => {
    //   const { playerId } = action.payload;

    //   // Find the index of the player in the playeres array
    //   const playerIndex = state.players.findIndex((player:Player) => player.id === playerId);

    //   // If the player is found, update its status
    //   if (playerIndex !== -1) {
    //     state.players[playerIndex].status = "cancelled";
    //   }
    // },
  },
});

export const { setPlayers, setLoading, setError, setFilters, setPagination, setTotal, deletePlayer,selectPlayerById,} = playerSlice.actions;
export const selectPlayers = (state: RootState) => state.players;

export default playerSlice.reducer;