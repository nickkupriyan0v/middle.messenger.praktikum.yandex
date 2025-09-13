import { describe, it, expect, vi, beforeEach } from 'vitest';
import createStore from '.';

describe('createStore', () => {
  type TestState = {
    value: number;
    data: string;
  };

  const initialState: TestState = {
    value: 0,
    data: 'test'
  };

  let store: ReturnType<typeof createStore<TestState>>;

  beforeEach(() => {
    store = createStore(initialState);
  });

  describe('getState', () => {
    it('возвращает начальное состояние', () => {
      expect(store.getState()).toEqual(initialState);
    });

    it('возвращает актуальное состояние после обновлений', () => {
      const newState = { value: 42 };
      store.setState(newState);

      expect(store.getState()).toEqual({
        ...initialState,
        ...newState
      });
    });
  });

  describe('setState', () => {
    it('обновляет состояние', () => {
      const newState = { value: 100 };
      store.setState(newState);

      expect(store.getState()).toHaveProperty('value', 100);
      expect(store.getState().data).toBe('test');
    });

    it('вызывает всех подписчиков', () => {
      const listener1 = vi.fn();
      const listener2 = vi.fn();

      store.subscribe(listener1);
      store.subscribe(listener2);

      const newState = { value: 200 };
      store.setState(newState);

      expect(listener1).toHaveBeenCalledWith(store.getState());
      expect(listener2).toHaveBeenCalledWith(store.getState());
    });

    it('вызывает подписчиков только после обновления', () => {
      let receivedState: TestState | undefined;
      const listener = vi.fn().mockImplementation((state) => {
        receivedState = state;
      });

      store.subscribe(listener);
      store.setState({ value: 300 });

      expect(listener).toHaveBeenCalledTimes(1);
      expect(receivedState?.value).toBe(300);
    });
  });

  describe('subscribe', () => {
    it('добавляет подписчика и возвращает функцию отписки', () => {
      const listener = vi.fn();
      const unsubscribe = store.subscribe(listener);

      store.setState({ value: 400 });
      expect(listener).toHaveBeenCalledTimes(1);

      unsubscribe();
      store.setState({ value: 500 });
      expect(listener).toHaveBeenCalledTimes(1);
    });

    it('корректно обрабатывает множественные отписки', () => {
      const listener1 = vi.fn();
      const listener2 = vi.fn();

      const unsub1 = store.subscribe(listener1);
      const unsub2 = store.subscribe(listener2);

      store.setState({ value: 600 });
      expect(listener1).toHaveBeenCalledTimes(1);
      expect(listener2).toHaveBeenCalledTimes(1);

      unsub1();
      store.setState({ value: 700 });
      expect(listener1).toHaveBeenCalledTimes(1);
      expect(listener2).toHaveBeenCalledTimes(2);

      unsub2();
      store.setState({ value: 800 });
      expect(listener1).toHaveBeenCalledTimes(1);
      expect(listener2).toHaveBeenCalledTimes(2);
    });

    it('не пропускает уведомления при отписке во время вызова', () => {
      const unsubscribe = vi.fn();
      const listener = vi.fn().mockImplementation(() => {
        unsubscribe();
      });
      
      unsubscribe.mockImplementation(store.subscribe(listener));
      store.setState({ value: 900 });

      expect(listener).toHaveBeenCalledTimes(1);
      expect(unsubscribe).toHaveBeenCalledTimes(1);
    });
  });

  it('работает с пустым начальным состоянием', () => {
    const emptyStore = createStore<Record<string, unknown>>();
    expect(emptyStore.getState()).toEqual({});

    emptyStore.setState({ key: 'value' });
    expect(emptyStore.getState()).toEqual({ key: 'value' });
  });
});
