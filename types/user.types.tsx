type UserReduxState = {
    username: string | null;
    email: string | null;
    isAuthenticated: boolean;
    accessToken: string | null;
  }