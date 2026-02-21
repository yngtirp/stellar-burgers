import { combineSlices } from '@reduxjs/toolkit';
import { ingredientsSlice } from './slices/burgerIngridiensSlice';

export const rootReducer = combineSlices(ingredientsSlice);
