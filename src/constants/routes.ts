import type Block from '../lib/block';
import ChatsPage from '../pages/chatsPage';
import EditPasswordPage from '../pages/editPasswordPage';
import EditProfilePage from '../pages/editProfilePage';
import ErrorPage from '../pages/errorPage';
import ProfilePage from '../pages/profilePage';
import SignInPage from '../pages/signInPage';
import SignUpPage from '../pages/signUpPage';

export interface IRoute { name: string, component: Block }

export const ROUTES = [
  { name: '404', component: new ErrorPage({ code: '404', text: 'Вы вошли не в ту дверь' }) },
  { name: '500', component: new ErrorPage({ code: '500', text: 'Наташ, мы там все уронили' }) },
  { name: 'Регистарция', component: new SignUpPage() },
  { name: 'Вход', component: new SignInPage() },
  { name: 'Чаты', component: new ChatsPage() },
  { name: 'Профиль', component: new ProfilePage() },
  { name: 'Редактирование профиля', component: new EditProfilePage() },
  { name: 'Редактирование пароля', component: new EditPasswordPage() },
];
