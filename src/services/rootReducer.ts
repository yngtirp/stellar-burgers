import { combineSlices } from '@reduxjs/toolkit';
import { ingredientsSlice } from './slices/IngredientsSlice';
import { feedSlice } from './slices/feedSlice';
import { ordersSlice } from './slices/ordersSlice';
import { constructorSlice } from './slices/constructorSlice';
import { ingredientDetailsSlice } from './slices/ingredientDetailsSlice';
import { orderDetailsSlice } from './slices/orderDetailsSlice';
import { registerUserSlice } from './slices/registerUserSlice';

export const rootReducer = combineSlices(
  ingredientsSlice,
  feedSlice,
  ordersSlice,
  constructorSlice,
  ingredientDetailsSlice,
  orderDetailsSlice,
  registerUserSlice
);
