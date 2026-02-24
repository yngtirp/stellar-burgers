import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrderByNumberApi } from '@api';
import { TOrderResponse } from '@api';
interface orderDetailsState {
  currentOrder: TOrder | null;
  loading: boolean;
  error: string | null;
}

const initialState: orderDetailsState = {
  currentOrder: null,
  loading: false,
  error: null
};

export const getOrderByNumber = createAsyncThunk(
  '/orderByNumber/get',
  getOrderByNumberApi
);

export const orderDetailsSlice = createSlice({
  name: 'orderDetails',
  initialState,
  reducers: {},
  selectors: {
    getOrderDetailsSelector: (state) => state.currentOrder,
    getLoadingOrderDetailsSelector: (state) => state.loading,
    getErrorOrderDetailsSelector: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderByNumber.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(
        getOrderByNumber.fulfilled,
        (state, action: PayloadAction<TOrderResponse>) => {
          state.loading = false;
          state.error = null;
          state.currentOrder = action.payload.orders[0];
        }
      );
  }
});

export const {
  getOrderDetailsSelector,
  getLoadingOrderDetailsSelector,
  getErrorOrderDetailsSelector
} = orderDetailsSlice.selectors;
