import { ordersSlice, initialState, getOrders } from './ordersSlice';
import { TOrder } from '@utils-types';

const reducer = ordersSlice.reducer;

describe('test ordersSlice', () => {
  const mockOrders: TOrder[] = [
    {
      _id: 'test',
      status: 'test',
      name: 'test',
      createdAt: 'test',
      updatedAt: 'test',
      number: 0,
      ingredients: ['test']
    }
  ];

  describe('test getOrders', () => {
    it('test getOrders.pending', () => {
      const state = reducer(initialState, { type: getOrders.pending.type });
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('test getOrders.rejected', () => {
      const state = reducer(initialState, {
        type: getOrders.rejected.type,
        error: { message: 'errorMessage' }
      });
      expect(state.loading).toBe(false);
      expect(state.error).toBe('errorMessage');
    });

    it('test getOrders.fulfilled', () => {
      const state = reducer(initialState, {
        type: getOrders.fulfilled.type,
        payload: mockOrders
      });
      expect(state.loading).toBe(false);
      expect(state.error).toBeNull();
      expect(state.orders).toEqual(mockOrders);
    });
  });
});
