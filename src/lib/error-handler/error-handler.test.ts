import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { withTryCatch } from '.';

describe('withTryCatch', () => {
  let originalAlert: typeof window.alert;
  let mockAlert: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockAlert = vi.fn();
    originalAlert = window.alert;
    window.alert = mockAlert;
  });

  afterEach(() => {
    window.alert = originalAlert;
  });

  it('возвращает данные и null при успешном промисе', async () => {
    const successfulPromise = Promise.resolve('test data');
    const result = await withTryCatch(successfulPromise);
    
    expect(result).toEqual(['test data', null]);
    expect(mockAlert).not.toHaveBeenCalled();
  });

  it('возвращает null и ошибку при отклоненном промисе', async () => {
    const errorResponse = JSON.stringify({ error: 'Server', reason: 'Not found' });
    const failingPromise = Promise.reject(errorResponse);
    const result = await withTryCatch(failingPromise);
    
    expect(result).toEqual([null, 'Server Not found']);
    expect(mockAlert).toHaveBeenCalledWith('Server Not found');
  });

  it('не показывает alert при skipError = true', async () => {
    const errorResponse = JSON.stringify({ error: 'Server', reason: 'Error' });
    const failingPromise = Promise.reject(errorResponse);
    const result = await withTryCatch(failingPromise, true);
    
    expect(result).toEqual([null, 'Server Error']);
    expect(mockAlert).not.toHaveBeenCalled();
  });

  it('обрабатывает ошибку без деталей', async () => {
    const errorResponse = JSON.stringify(null);
    const failingPromise = Promise.reject(errorResponse);
    const result = await withTryCatch(failingPromise);
    
    expect(result).toEqual([null, 'Неизвестная ошибка']);
    expect(mockAlert).toHaveBeenCalledWith('Неизвестная ошибка');
  });

  it('обрабатывает ошибку с частичными данными', async () => {
    const errorResponse = JSON.stringify({ error: 'Authentication' });
    const failingPromise = Promise.reject(errorResponse);
    const result = await withTryCatch(failingPromise);
    
    expect(result).toEqual([null, 'Authentication ']);
    expect(mockAlert).toHaveBeenCalledWith('Authentication ');
  });

  it('обрабатывает пустой объект ошибки', async () => {
    const errorResponse = JSON.stringify({});
    const failingPromise = Promise.reject(errorResponse);
    const result = await withTryCatch(failingPromise);
    
    expect(result).toEqual([null, ' ']);
    expect(mockAlert).toHaveBeenCalledWith(' ');
  });

  it('сохраняет типы данных при успехе', async () => {
    const userData = { id: 1, name: 'John' };
    const successfulPromise = Promise.resolve(userData);
    const result = await withTryCatch<{ id: number; name: string }>(successfulPromise);
    
    expect(result[0]).toEqual(userData);
    expect(result[1]).toBeNull();
  });

  it('сохраняет тип ошибки при неудаче', async () => {
    const errorResponse = JSON.stringify({ error: 'Server', reason: 'Error' });
    const failingPromise = Promise.reject(errorResponse);
    const result = await withTryCatch<unknown, string>(failingPromise);
    
    expect(result[0]).toBeNull();
    expect(typeof result[1]).toBe('string');
  });
});
