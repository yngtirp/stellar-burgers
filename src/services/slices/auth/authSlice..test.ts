import { registerUserThunk, loginUserThunk, getUserThunk, updateUserThunk, logoutUserThunk, authSlice, initialState } from "./authSlice";
import { TAuthResponse, TUserResponse } from "@api";
import { TUser } from "@utils-types";

const reducer = authSlice.reducer;

describe('test authSlice', () => {  
  const mockUser: TUser = { 
    email: 'test',
    name: 'test'
  }

  const mockAuthResponse: TAuthResponse = { 
    success: true,
    refreshToken: 'test',
    accessToken: 'test',
    user: mockUser
  }

  const mockUserResponse: TUserResponse = { 
    success: true,
    user: mockUser
  }

  describe('test registerUserThunk', () => { 
    it('test registerUserThunk.pending', () => { 
      const state = reducer(initialState, { type: registerUserThunk.pending.type })
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('test registerUserThunk.rejected', () => { 
      const state = reducer(initialState, { type: registerUserThunk.rejected.type,
        error: { message: 'errorMessage' } })
      expect(state.loading).toBe(false);
      expect(state.error).toBe('errorMessage');
    });

    it('test registerUserThunk.fulfilled', () => { 
      const state = reducer(initialState, { type: registerUserThunk.fulfilled.type,
        payload: mockAuthResponse })
      expect(state.loading).toBe(false);
      expect(state.error).toBeNull();
      expect(state.user).toEqual(mockAuthResponse.user);
    });
  });

  describe('test loginUserThunk', () => { 
    it('test loginUserThunk.pending', () => { 
      const state = reducer(initialState, { type: loginUserThunk.pending.type })
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('test loginUserThunk.rejected', () => { 
      const state = reducer(initialState, { type: loginUserThunk.rejected.type,
        error: { message: 'errorMessage' } })
      expect(state.loading).toBe(false);
      expect(state.error).toBe('errorMessage');
    });

    it('test loginUserThunk.fulfilled', () => { 
      const state = reducer(initialState, { type: loginUserThunk.fulfilled.type,
        payload: mockAuthResponse })
      expect(state.loading).toBe(false);
      expect(state.error).toBeNull();
      expect(state.user).toEqual(mockAuthResponse.user);
    });
  });

  describe('test getUserThunk', () => { 
    it('test getUserThunk.pending', () => { 
      const state = reducer(initialState, { type: getUserThunk.pending.type })
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('test getUserThunk.rejected', () => { 
      const state = reducer(initialState, { type: getUserThunk.rejected.type,
        error: { message: 'errorMessage' } })
      expect(state.loading).toBe(false);
      expect(state.error).toBe('errorMessage');
    });

    it('test getUserThunk.fulfilled', () => { 
      const state = reducer(initialState, { type: getUserThunk.fulfilled.type,
        payload: mockUserResponse })
      expect(state.loading).toBe(false);
      expect(state.error).toBeNull();
      expect(state.user).toEqual(mockUserResponse.user);
    });
  });
  
  describe('test updateUserThunk', () => { 
    it('test updateUserThunk.pending', () => { 
      const state = reducer(initialState, { type: updateUserThunk.pending.type })
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('test updateUserThunk.rejected', () => { 
      const state = reducer(initialState, { type: updateUserThunk.rejected.type,
        error: { message: 'errorMessage' } })
      expect(state.loading).toBe(false);
      expect(state.error).toBe('errorMessage');
    });

    it('test updateUserThunk.fulfilled', () => { 
      const state = reducer(initialState, { type: updateUserThunk.fulfilled.type,
        payload: mockUserResponse })
      expect(state.loading).toBe(false);
      expect(state.error).toBeNull();
      expect(state.user).toEqual(mockUserResponse.user);
    });
  });

  describe('test logoutUserThunk', () => { 
    it('test logoutUserThunk.pending', () => { 
      const state = reducer(initialState, { type: logoutUserThunk.pending.type })
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('test logoutUserThunk.rejected', () => { 
      const state = reducer(initialState, { type: logoutUserThunk.rejected.type,
        error: { message: 'errorMessage' } })
      expect(state.loading).toBe(false);
      expect(state.error).toBe('errorMessage');
    });

    it('test logoutUserThunk.fulfilled', () => { 
      const state = reducer(initialState, { type: logoutUserThunk.fulfilled.type })
      expect(state.loading).toBe(false);
      expect(state.error).toBeNull();
      expect(state.user).toBe(undefined);
    });
  });
})
