import {
  registerUserApi,
  TAuthResponse,
  loginUserApi,
  getUserApi,
  updateUserApi,
  logoutApi,
  TUserResponse
} from '@api';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';

interface authSliceState {
  user: TUser | undefined;
  loading: boolean;
  error: string | null;
}

const initialState: authSliceState = {
  user: undefined,
  loading: true,
  error: null
};

export const registerUserThunk = createAsyncThunk(
  'registerUser/post',
  registerUserApi
);
export const loginUserThunk = createAsyncThunk('loginUser/post', loginUserApi);
export const getUserThunk = createAsyncThunk('getUser/post', getUserApi);
export const updateUserThunk = createAsyncThunk(
  'updateUser/post',
  updateUserApi
);
export const logoutUserThunk = createAsyncThunk('logoutUser/post', logoutApi);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  selectors: {
    getUserSelector: (state) => state.user,
    getLoadingAuthSelector: (state) => state.loading
  },
  extraReducers: (builder) => {
    builder
      // registerUserThunk
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
          state.user = action.payload.user;
        }
      )
      // loginUserThunk
      .addCase(loginUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(
        loginUserThunk.fulfilled,
        (state, action: PayloadAction<TAuthResponse>) => {
          state.loading = false;
          state.error = null;
          state.user = action.payload.user;
        }
      )
      // getUserThunk
      .addCase(getUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(
        getUserThunk.fulfilled,
        (state, action: PayloadAction<TUserResponse>) => {
          state.loading = false;
          state.error = null;
          state.user = action.payload.user;
        }
      )
      // updateUserThunk
      .addCase(updateUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(
        updateUserThunk.fulfilled,
        (state, action: PayloadAction<TUserResponse>) => {
          state.loading = false;
          state.error = null;
          state.user = action.payload.user;
        }
      )
      // logoutUserThunk
      .addCase(logoutUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(logoutUserThunk.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.user = undefined;
      });
  }
});

export const { getUserSelector, getLoadingAuthSelector } = authSlice.selectors;
