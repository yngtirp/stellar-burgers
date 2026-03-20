import {
  orderDetailsSlice,
  initialState,
  getOrderByNumber
} from './orderDetailsSlice';
import { TOrderResponse } from '@api';
import { TOrder } from '@utils-types';

const reducer = orderDetailsSlice.reducer;

describe('test orderDetailsSlice', () => {
  const mockOrder: TOrder = {
    _id: 'test',
    status: 'test',
    name: 'test',
    createdAt: 'test',
    updatedAt: 'test',
    number: 0,
    ingredients: ['test']
  };

  const mocNewOrderResponse: TOrderResponse = {
    success: true,
    orders: [mockOrder]
  };

  describe('test getOrderByNumber', () => {
    it('test getOrderByNumber.pending', () => {
      const state = reducer(initialState, {
        type: getOrderByNumber.pending.type
      });
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('test getOrderByNumber.rejected', () => {
      const state = reducer(initialState, {
        type: getOrderByNumber.rejected.type,
        error: { message: 'errorMessage' }
      });
      expect(state.loading).toBe(false);
      expect(state.error).toBe('errorMessage');
    });

    it('test getOrderByNumber.fulfilled', () => {
      const state = reducer(initialState, {
        type: getOrderByNumber.fulfilled.type,
        payload: mocNewOrderResponse
      });
      expect(state.loading).toBe(false);
      expect(state.error).toBeNull();
      expect(state.currentOrder).toEqual(mocNewOrderResponse.orders[0]);
    });
  });
});
