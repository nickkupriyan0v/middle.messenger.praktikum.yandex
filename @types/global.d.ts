import type Router from '../src/lib/router';
import createStore from '../src/lib/store';
import type { IAppState } from '../src/lib/store/types';

declare global {
  interface Window {
    router: Router;
    store: ReturnType<typeof createStore<Partial<IAppState>>>;
  }
}
