import { AUTH_API } from '../../api/auth';
import type { ISignInData, ISignUpData } from '../../api/auth/types';
import { ROUTES } from '../../constants/routes';
import { withTryCatch } from '../../lib/error-handler';
import type { IUser } from '../../models/user';

export const signUp = async (data: ISignUpData) => {
  const [isSignedUp] = await withTryCatch(AUTH_API.signUp(data));
  if (isSignedUp) {
    await fetchMe();
    window.router.go(ROUTES.chats);
  }
};

export const signIn = async (data: ISignInData) => {
  const [isSigned] = await withTryCatch(AUTH_API.signIn(data));
  if (isSigned) {
    await fetchMe();
    window.router.go(ROUTES.chats);
  }
};

export const logout = async () => {
  const [isLogout] = await withTryCatch<IUser>(AUTH_API.logout());
  if (isLogout) {
    window.router.go(ROUTES.signIn);
  }
};

export const fetchMe = async () => {
  const [user] = await withTryCatch<IUser>(AUTH_API.me(), true);
  const { setState } = window.store;
  setState({ user });
  return user;
};
