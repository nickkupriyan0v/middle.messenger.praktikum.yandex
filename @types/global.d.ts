import type Router from '../src/lib/router';

declare global {
  interface Window {
    router: Router;
  }
}
