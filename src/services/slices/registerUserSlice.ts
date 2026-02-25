import { registerUserApi, TAuthResponse, TRegisterData } from '@api';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';

interface registerUserSliceState {
  refreshToken: string;
  accessToken: string;
  user: TUser | null;
  loading: boolean;
  error: string | null;
}

const initialState: registerUserSliceState = {
  refreshToken: '',
  accessToken: '',
  user: null,
  loading: false,
  error: null
};

export const registerUserThunk = createAsyncThunk(
  'registerUser/post',
  (data: TRegisterData) => registerUserApi(data)
);

export const registerUserSlice = createSlice({
  name: 'registerUser',
  initialState,
  reducers: {},
  selectors: {
    getUserSelector: (state) => state.user,
    getRefreshTokenSelector: (state) => state.refreshToken,
    getAccessTokenSelector: (state) => state.accessToken,
    getLoadingRegisterSelector: (state) => state.loading
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(
        registerUserThunk.fulfilled,
        (state, action: PayloadAction<TAuthResponse>) => {
          state.loading = false;
          state.error = null;
          state.accessToken = action.payload.accessToken;
          state.refreshToken = action.payload.refreshToken;
          state.user = action.payload.user;
        }
      );
  }
});

export const {
  getUserSelector,
  getRefreshTokenSelector,
  getAccessTokenSelector,
  getLoadingRegisterSelector
} = registerUserSlice.selectors;
