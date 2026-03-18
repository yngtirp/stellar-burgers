import { getOrdersApi, TFeedsResponse } from '@api';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

interface TOrdersSliceState {
  loading: boolean;
  error: string | null;
  orders: TOrder[];
}

const initialState: TOrdersSliceState = {
  loading: false,
  error: null,
  orders: []
};

export const getOrders = createAsyncThunk('/orders/get', getOrdersApi);

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  selectors: {
    getOrdersSelector: (state) => state.orders,
    getErrorSelector: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(
        getOrders.fulfilled,
        (state, action: PayloadAction<TOrder[]>) => {
          state.loading = false;
          state.error = null;
          state.orders = action.payload;
        }
      );
  }
});

export const { getOrdersSelector, getErrorSelector } = ordersSlice.selectors;
