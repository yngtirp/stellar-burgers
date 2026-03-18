import { combineSlices } from '@reduxjs/toolkit';
import { ingredientsSlice } from './../slices/ingredients/IngredientsSlice';
import { feedSlice } from './../slices/feed/feedSlice';
import { ordersSlice } from './../slices/orders/ordersSlice';
import { constructorSlice } from './../slices/constructor/constructorSlice';
import { orderDetailsSlice } from './../slices/orderDetails/orderDetailsSlice';
import { authSlice } from './../slices/auth/authSlice';

export const rootReducer = combineSlices(
  ingredientsSlice,
  feedSlice,
  ordersSlice,
  constructorSlice,
  orderDetailsSlice,
  authSlice
);
