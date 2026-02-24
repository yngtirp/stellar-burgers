import { orderBurgerApi, TNewOrderResponse, TNewOrder } from '@api';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TOrder, TIngredient, TConstructorIngredient } from '@utils-types';
import { nanoid } from '@reduxjs/toolkit';

interface TConstructorSliceState {
  orderModalData: TOrder | null;
  constructorItems: {
    bun: TIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  orderRequest: boolean;
  error: string | null;
}

const initialState: TConstructorSliceState = {
  orderModalData: null,
  constructorItems: {
    bun: null,
    ingredients: []
  },
  orderRequest: false,
  error: null
};

export const postOrder = createAsyncThunk(
  'constructorbg/sendOrder',
  (data: string[]) => orderBurgerApi(data)
);

export const constructorSlice = createSlice({
  name: 'BurgerConstructor',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<TIngredient>) => {
      if (action.payload.type === 'bun') {
        state.constructorItems.bun = action.payload;
      } else {
        state.constructorItems.ingredients.push({
          ...action.payload,
          id: nanoid()
        });
      }
    },
    removeIngredient: (state, action) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (ingredient) => ingredient.id != action.payload
        );
    },
    moveIngredientToUp: (state, action: PayloadAction<number>) => {
      [
        state.constructorItems.ingredients[action.payload],
        state.constructorItems.ingredients[action.payload - 1]
      ] = [
        state.constructorItems.ingredients[action.payload - 1],
        state.constructorItems.ingredients[action.payload]
      ];
    },
    moveIngredientToDown: (state, action: PayloadAction<number>) => {
      [
        state.constructorItems.ingredients[action.payload],
        state.constructorItems.ingredients[action.payload + 1]
      ] = [
        state.constructorItems.ingredients[action.payload + 1],
        state.constructorItems.ingredients[action.payload]
      ];
    },
    setNullOrderModalData: (state) => {
      state.orderModalData = null;
    },
    setOrderRequest: (state, action: PayloadAction<boolean>) => {
      state.orderRequest = action.payload;
    }
  },
  selectors: {
    getConstructorSelector: (state) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(postOrder.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(postOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.error.message as string;
      })
      .addCase(
        postOrder.fulfilled,
        (state, action: PayloadAction<TNewOrderResponse>) => {
          state.orderRequest = false;
          state.error = null;
          state.orderModalData = action.payload.order;
          state.constructorItems.bun = null;
          state.constructorItems.ingredients = [];
        }
      );
  }
});

export const {
  addIngredient,
  removeIngredient,
  moveIngredientToDown,
  moveIngredientToUp,
  setNullOrderModalData,
  setOrderRequest
} = constructorSlice.actions;

export const { getConstructorSelector } = constructorSlice.selectors;
