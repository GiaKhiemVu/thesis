// src/store/userSlice.ts
import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';

const initialState: UserReduxState = {
  username: null,
  email: null,
  isAuthenticated: false,
  accessToken: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state: UserReduxState, action: PayloadAction<{ username: string, email: string }>) {
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.isAuthenticated = true;
    },
    updateAccessToken(state: UserReduxState){
      state.accessToken = sessionStorage.getItem('accessToken')
    },
    reset(state: UserReduxState) {
      state.username = null;
      state.email = null;
      state.isAuthenticated = false;
    }
  }
});

export const { setUser, reset } = userSlice.actions;
export default userSlice.reducer;

export async function signin(payload: LoginFormObject): Promise<string> {
  const token = await new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve('fakeAccessToken');
    }, 1000);
  });

  sessionStorage.setItem('accessToken', token);
  return token;
}