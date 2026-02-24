import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

interface ingredientDetailsState {
  ingredient: TIngredient | null;
}

const initialState: ingredientDetailsState = {
  ingredient: null
};

export const ingredientDetailsSlice = createSlice({
  name: 'ingridientDetails',
  initialState,
  reducers: {
    changeIngredient: (state, action: PayloadAction<TIngredient>) => {
      state.ingredient = action.payload;
    }
  },
  selectors: {
    getIngredientDetailsSelector: (state) => state.ingredient
  }
});

export const { getIngredientDetailsSelector } =
  ingredientDetailsSlice.selectors;

export const { changeIngredient } = ingredientDetailsSlice.actions;
