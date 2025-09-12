import ChatsPage from '../pages/chatsPage';
import EditPasswordPage from '../pages/editPasswordPage';
import EditProfilePage from '../pages/editProfilePage';
import ErrorPage from '../pages/errorPage';
import ProfilePage from '../pages/profilePage';
import SignInPage from '../pages/signInPage';
import SignUpPage from '../pages/signUpPage';

export const ROUTES = {
  notFound: '/404',
  serverDown: '/500',
  signUp: '/sign-up',
  signIn: '/',
  chats: '/messenger',
  profile: '/profile',
  editProfile: '/edit-profile',
  editPassword: '/edit-password',
};

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

export const UNATHORIZE_ROUTES = [
  ROUTES.signIn,
  ROUTES.signUp,
];

