import HTTPTransport from '../../lib/http-transport';
import { API_MAPPING } from '../../env';
import type { ISignInData, ISignUpData } from './types';
import type { IUser } from '../../models/user';

const httpClient = new HTTPTransport(API_MAPPING.auth);

export const AUTH_API = {
  signIn: (data: ISignInData) => httpClient.post('signin', { data }),
  signUp: (data: ISignUpData) => httpClient.post('signup', { data }),
  logout: () => httpClient.post('logout'),
  me: (): Promise<IUser> => httpClient.get('user'),
};
