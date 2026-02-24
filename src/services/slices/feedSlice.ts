import { getFeedsApi, TFeedsResponse } from '@api';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

interface TFeedSliceState {
  loading: boolean;
  error: string | null;
  orders: TOrder[];
  total: number;
  totalToday: number;
}

const initialState: TFeedSliceState = {
  loading: false,
  error: null,
  orders: [],
  total: 0,
  totalToday: 0
};

export const getFeed = createAsyncThunk('/feed/get', getFeedsApi);

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    getOrdersSelector: (state) => state.orders,
    getErrorSelector: (state) => state.error,
    getTotal: (state) => state.total,
    getTotalToday: (state) => state.totalToday
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeed.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFeed.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(
        getFeed.fulfilled,
        (state, action: PayloadAction<TFeedsResponse>) => {
          state.loading = false;
          state.error = null;
          state.orders = action.payload.orders;
          state.total = action.payload.total;
          state.totalToday = action.payload.totalToday;
        }
      );
  }
});

export const { getOrdersSelector, getErrorSelector, getTotal, getTotalToday } =
  feedSlice.selectors;
