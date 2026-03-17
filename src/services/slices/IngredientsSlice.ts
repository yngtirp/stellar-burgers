import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getIngredientsApi } from '@api';

interface IngredientsState {
  loading: boolean;
  error: string | null;
  ingredients: TIngredient[];
}

const initialState: IngredientsState = {
  loading: false,
  error: null,
  ingredients: []
};

export const getIngredients = createAsyncThunk(
  '/ingredients/get',
  getIngredientsApi
);

export const ingredientsSlice = createSlice({
  name: 'ingridients',
  initialState,
  reducers: {},
  selectors: {
    getIngredientsSelector: (state) => state.ingredients,
    getLoadingSelector: (state) => state.loading,
    getErrorSelector: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(
        getIngredients.fulfilled,
        (state, action: PayloadAction<TIngredient[]>) => {
          state.loading = false;
          state.error = null;
          state.ingredients = action.payload;
        }
      );
  }
});

export const { getIngredientsSelector, getLoadingSelector, getErrorSelector } =
  ingredientsSlice.selectors;
