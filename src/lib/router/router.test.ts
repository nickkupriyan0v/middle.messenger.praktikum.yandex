import { describe, it, expect, vi, beforeEach, afterEach, type MockInstance } from 'vitest';
import Router from '.';
import { ROUTES } from '../../constants/routes';
import type Block from '../block';

class MockBlock {
  getContent() {
    return document.createElement('div');
  }
}

vi.mock('../../constants/routes', () => ({
  ROUTES: {
    notFound: '/404'
  }
}));

describe('Router', () => {
  let router: Router;
  let pushStateSpy: MockInstance;
  let replaceStateSpy: MockInstance;
  let backSpy: MockInstance;
  let forwardSpy: MockInstance;

  beforeEach(() => {
    pushStateSpy = vi.spyOn(window.history, 'pushState');
    replaceStateSpy = vi.spyOn(window.history, 'replaceState');
    backSpy = vi.spyOn(window.history, 'back');
    forwardSpy = vi.spyOn(window.history, 'forward');
    
    document.body.innerHTML = '<div id="app"></div>';
    router = new Router('#app');
  });

  afterEach(() => {
    vi.clearAllMocks();
    pushStateSpy.mockRestore();
    replaceStateSpy.mockRestore();
    backSpy.mockRestore();
    forwardSpy.mockRestore();
  });

  it('создает экземпляр Router', () => {
    expect(router).toBeInstanceOf(Router);
  });

  it('является синглтоном', () => {
    const router2 = new Router('#app');

    expect(router2).toBe(router);
  });

  it('добавляет маршруты через use', () => {
    router.use('/test', MockBlock as unknown as typeof Block);
    const route = router.getRoute('/test');
    
    expect(route).toBeDefined();
    expect(route?.match('/test')).toBe(true);
  });

  it('переходит по маршруту через go', () => {
    router.use('/test', MockBlock as unknown as typeof Block);
    router.go('/test');
    
    expect(pushStateSpy).toHaveBeenCalledWith({}, '', '/test');
  });

  it('вызывает back и forward', () => {
    router.back();
    router.forward();
    
    expect(backSpy).toHaveBeenCalled();
    expect(forwardSpy).toHaveBeenCalled();
  });

  it('обрабатывает переход на несуществующий маршрут', () => {
    router.use(ROUTES.notFound, MockBlock as unknown as typeof Block);
    router.go('/unknown');

    expect(replaceStateSpy).toHaveBeenCalledWith({}, '', ROUTES.notFound);
  });

  it('устанавливает обработчик popstate при start', () => {
    const originalOnPopState = window.onpopstate;
    router.use('/test', MockBlock as unknown as typeof Block);
    router.start();

    expect(window.onpopstate).not.toBe(originalOnPopState);
  });

  it('рендерит блок при переходе на маршрут', () => {
    router.use('/test', MockBlock as unknown as typeof Block);
    router.go('/test');
    const appElement = document.querySelector('#app');
    
    expect(appElement?.children.length).toBe(1);
  });

  it('удаляет предыдущий блок при переходе на новый маршрут', () => {
    router.use('/route1', MockBlock as unknown as typeof Block);
    router.use('/route2', MockBlock as unknown as typeof Block);
    router.go('/route1');
    const appElement = document.querySelector('#app');
    const firstRenderCount = appElement?.children.length;

    expect(firstRenderCount).toBe(1);

    router.go('/route2');

    expect(appElement?.children.length).toBe(1);
  });
});

describe('Route', () => {
  let router: Router;

  beforeEach(() => {
    document.body.innerHTML = '<div id="app"></div>';
    router = new Router('#app');
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('совпадает с правильным pathname', () => {
    router.use('/test', MockBlock as unknown as typeof Block);
    const route = router.getRoute('/test');
    
    expect(route?.match('/test')).toBe(true);
    expect(route?.match('/other')).toBe(false);
  });

  it('рендерит блок при навигации на совпадающий маршрут', () => {
    router.use('/test', MockBlock as unknown as typeof Block);
    router.go('/test');
    const appElement = document.querySelector('#app');

    expect(appElement?.children.length).toBe(1);
  });
});
