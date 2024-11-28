export const selectUserDetail = (state: {user: UserReduxState}) => state.user.userDetail
export const isLoading = (state: {user: UserReduxState}) => state.user.status.isLoading