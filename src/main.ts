import './base.scss';

import { ROUTES, ROUTES_MAPPING, UNATHORIZE_ROUTES } from './constants/routes';
import type Block from './lib/block';
import Router from './lib/router';
import createStore from './lib/store';
import { STORE_DEFAULT_STATE } from './lib/store/const';
import { fetchMe } from './services/auth';

window.router = new Router('#app');
window.store = createStore(STORE_DEFAULT_STATE);

Object
  .values(ROUTES_MAPPING)
  .forEach(({ pathname, component }) => window.router.use(pathname, component as typeof Block));

const init =  async () => {
  const user = await fetchMe();
  if (user && UNATHORIZE_ROUTES.includes(window.location.pathname)) {
    window.router.go(ROUTES.chats);
  }

  if (!user) {
    window.router.go(ROUTES.signIn);
  }
  
  window.router.start();
};

init();

