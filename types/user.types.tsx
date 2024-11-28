type UserReduxState = {
  userDetail: UserDetail | null,
  accessToken: string | null,
  status: statusRedux,
}

type statusRedux = {
  error: boolean,
  isInit: boolean,
  isLoading: boolean,
}

type UserDetail = {
  username: string,
  email: string,
}