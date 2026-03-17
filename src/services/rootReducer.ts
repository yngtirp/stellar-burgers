import { combineSlices } from '@reduxjs/toolkit';
import { ingredientsSlice } from './slices/IngredientsSlice';
import { feedSlice } from './slices/feedSlice';
import { ordersSlice } from './slices/ordersSlice';
import { constructorSlice } from './slices/constructorSlice';
import { orderDetailsSlice } from './slices/orderDetailsSlice';
import { authSlice } from './slices/authSlice';

export const rootReducer = combineSlices(
  ingredientsSlice,
  feedSlice,
  ordersSlice,
  constructorSlice,
  orderDetailsSlice,
  authSlice
);
