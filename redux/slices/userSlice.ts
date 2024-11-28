// src/store/userSlice.ts
import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';

const initialState: UserReduxState = {
  userDetail: null,
  accessToken: null,
  status: {
    error: false,
    isInit: false,
    isLoading: false,
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUserInfoStart(state: UserReduxState) {
      state.status.isLoading = true
    },
    getUserInfoError(state: UserReduxState){
      state.status.error = true
      state.status.isLoading = false
    },
    getUserInfoComplete(state: UserReduxState, action: PayloadAction<UserDetail>) {
      state.status.isLoading = false
      state.userDetail = action.payload
    },
    signinStart(state: UserReduxState){
      state.status.isLoading = true
    },
    signinError(state: UserReduxState){
      state.status.error = true
      state.status.isLoading = false
    },
    signinCompelete(state: UserReduxState, action: PayloadAction<string>){
      state.status.isLoading = false
      sessionStorage.setItem('accessToken', action.payload);
      console.log("set Token to storage");
    },
    setUser(state: UserReduxState, action: PayloadAction<UserDetail>) {
      state.userDetail = action.payload
    },
    updateAccessToken(state: UserReduxState){
      state.accessToken = sessionStorage.getItem('accessToken')
    },
    reset(state: UserReduxState) {
      state.userDetail = null
    }
  }
});

export const { setUser, reset } = userSlice.actions;
export default userSlice.reducer;

export async function signin(payload: LoginFormObject, dispatch: Dispatch): Promise<string> {
  dispatch(userSlice.actions.signinStart())
  const token = await new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve('fakeAccessToken');
    }, 10000);
  });
  dispatch(userSlice.actions.signinCompelete(token))
  return token;
}

export async function getUserInfo(token: string, dispatch: Dispatch): Promise<UserDetail> {
  dispatch(userSlice.actions.getUserInfoStart())
  const userDetail = await new Promise<UserDetail>((resolve) => {
    setTimeout(() => {
      resolve({
        username: 'kenvu',
        email: 'kenvu@gmail.com'
      })
      
    }, 10000)
  })
  dispatch(userSlice.actions.getUserInfoComplete(userDetail))

  console.log("fetchUserInfo Done")
  return userDetail
}