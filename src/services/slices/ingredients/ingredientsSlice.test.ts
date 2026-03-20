import {
  ingredientsSlice,
  getIngredients,
  initialState
} from './IngredientsSlice';
import { TIngredient } from '@utils-types';

const reducer = ingredientsSlice.reducer;

describe('test ingredientsSlice', () => {
  const mockIngredients: TIngredient[] = [
    {
      _id: 'test',
      name: 'test',
      type: 'test',
      proteins: 0,
      fat: 0,
      carbohydrates: 0,
      calories: 0,
      price: 0,
      image: 'test',
      image_large: 'test',
      image_mobile: 'test'
    }
  ];

  describe('test getIngredients', () => {
    it('test getIngredients.pending', () => {
      const state = reducer(initialState, {
        type: getIngredients.pending.type
      });
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('test getIngredients.rejected', () => {
      const state = reducer(initialState, {
        type: getIngredients.rejected.type,
        error: { message: 'errorMessage' }
      });
      expect(state.loading).toBe(false);
      expect(state.error).toBe('errorMessage');
    });

    it('test getIngredients.fulfilled', () => {
      const state = reducer(initialState, {
        type: getIngredients.fulfilled.type,
        payload: mockIngredients
      });
      expect(state.loading).toBe(false);
      expect(state.error).toBeNull();
      expect(state.ingredients).toEqual(mockIngredients);
    });
  });
});
