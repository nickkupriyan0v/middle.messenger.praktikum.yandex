import type Block from '../lib/block';
import ChatsPage from '../pages/chatsPage';
import EditPasswordPage from '../pages/editPasswordPage';
import EditProfilePage from '../pages/editProfilePage';
import ErrorPage from '../pages/errorPage';
import ProfilePage from '../pages/profilePage';
import SignInPage from '../pages/signInPage';
import SignUpPage from '../pages/signUpPage';

export interface IRoute { name: string, component: Block }

export const ROUTES = {
  notFound: '/404',
  serverDown: '/500',
  signUp: '/sign-up',
  signIn: '/sign-in',
  chats: '/chats',
  profile: '/profile',
  editProfile: '/edit-profile',
  editPassword: '/edit-password',
} as const;

export const ROUTES_MAPPING = [
  { pathname: ROUTES.notFound, component: ErrorPage },
  { pathname: ROUTES.serverDown, component: ErrorPage },
  { pathname: ROUTES.signUp, component: SignUpPage },
  { pathname: ROUTES.signIn, component: SignInPage },
  { pathname: ROUTES.chats, component: ChatsPage },
  { pathname: ROUTES.profile, component: ProfilePage },
  { pathname: ROUTES.editProfile, component: EditProfilePage },
  { pathname: ROUTES.editPassword, component: EditPasswordPage },
];
