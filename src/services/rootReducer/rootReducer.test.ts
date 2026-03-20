import { rootReducer } from './rootReducer';

describe('тест rootReducer', () => {
  it('тест инициализации состояния', () => {
    const state = rootReducer(undefined, { type: '' });
    expect(state).toHaveProperty('ingridients');
    expect(state).toHaveProperty('BurgerConstructor');
    expect(state).toHaveProperty('orderDetails');
    expect(state).toHaveProperty('feed');
    expect(state).toHaveProperty('orders');
    expect(state).toHaveProperty('auth');
  });

  it('тест начального состояния ingridients', () => {
    const state = rootReducer(undefined, { type: '' });
    expect(state.ingridients).toEqual({
      loading: false,
      error: null,
      ingredients: []
    });
  });

  it('тест начального состояния BurgerConstructor', () => {
    const state = rootReducer(undefined, { type: '' });
    expect(state.BurgerConstructor).toEqual({
      orderModalData: null,
      constructorItems: {
        bun: null,
        ingredients: []
      },
      orderRequest: false,
      error: null
    });
  });

  it('тест начального состояния orderDetails', () => {
    const state = rootReducer(undefined, { type: '' });
    expect(state.orderDetails).toEqual({
      currentOrder: null,
      loading: false,
      error: null
    });
  });

  it('тест начального состояния feed', () => {
    const state = rootReducer(undefined, { type: '' });
    expect(state.feed).toEqual({
      loading: false,
      error: null,
      orders: [],
      total: 0,
      totalToday: 0
    });
  });

  it('тест начального состояния orders', () => {
    const state = rootReducer(undefined, { type: '' });
    expect(state.orders).toEqual({
      loading: false,
      error: null,
      orders: []
    });
  });

  it('тест начального состояния auth', () => {
    const state = rootReducer(undefined, { type: '' });
    expect(state.auth).toEqual({
      user: undefined,
      loading: true,
      error: null
    });
  });
});
