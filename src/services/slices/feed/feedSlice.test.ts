import { feedSlice, initialState, getFeed } from './feedSlice';
import { TFeedsResponse } from '@api';
import { TOrder } from '@utils-types';

const reducer = feedSlice.reducer;

describe('test feedSlice', () => {
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

  const mockFeedResponse: TFeedsResponse = {
    success: true,
    orders: mockOrders,
    total: 0,
    totalToday: 0
  };

  describe('test getFeed', () => {
    it('test getFeed.pending', () => {
      const state = reducer(initialState, { type: getFeed.pending.type });
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('test getFeed.rejected', () => {
      const state = reducer(initialState, {
        type: getFeed.rejected.type,
        error: { message: 'errorMessage' }
      });
      expect(state.loading).toBe(false);
      expect(state.error).toBe('errorMessage');
    });

    it('test getFeed.fulfilled', () => {
      const state = reducer(initialState, {
        type: getFeed.fulfilled.type,
        payload: mockFeedResponse
      });
      expect(state.loading).toBe(false);
      expect(state.error).toBeNull();
      expect(state.orders).toEqual(mockFeedResponse.orders);
      expect(state.total).toBe(mockFeedResponse.total);
      expect(state.totalToday).toBe(mockFeedResponse.totalToday);
    });
  });
});
