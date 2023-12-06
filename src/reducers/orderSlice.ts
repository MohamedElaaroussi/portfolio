// orderSlice.js
import { Order, OrderStateType } from '@/utils/types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './rootReducers';

const initialState: OrderStateType = {
  orders: [],
  filters: {}, // Object representing applied filters
  pagination: {
    page: 1,
    pageSize: 10,
  },
  loading: false,
  error: null,
  totalItems: 0,
};

const orderSlice = createSlice({
  name: 'orders',
  initialState: initialState,
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload;
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
    // Selector function to get a order by ID
    selectOrderId: (state, action) => {
      state.orders = state.orders.filter((order: Order) => order.id === action.payload);
    },
    desactivateOrder: (state, action) => {
      const  orderId  = action.payload;

      // Find the index of the order in the orderes array
      const orderIndex = state.orders.findIndex((order:Order) => order.id === orderId);

      // If the order is found, update its status
       if (orderIndex !== -1) {
        state.orders[orderIndex].status = "cancelled";
       }
    },
    deleteOrder: (state, action) => {
      // Remove the order from the orders by its ID
      state.orders = state.orders.filter((order: Order) => order.id !== action.payload);
      state.totalItems = state.totalItems - 1;

    },
  },
});

export const { setOrders, setLoading, setError, setFilters, setPagination, setTotal, deleteOrder,selectOrderId,desactivateOrder } = orderSlice.actions;
export const selectorders = (state: RootState) => state.orders;

export default orderSlice.reducer;