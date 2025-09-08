import './base.scss';

import { ROUTES_MAPPING } from './constants/routes';
import type Block from './lib/block';
import Router from './lib/router';

window.router = new Router('#app');

Object
  .values(ROUTES_MAPPING)
  .forEach(({ pathname, component }) => window.router.use(pathname, component as typeof Block));

window.router.start();
