import { describe, it, expect, vi, beforeEach } from 'vitest';
import { HttpMethods } from './types';
import HTTPTransport from '.';

const mockXHR = {
  open: vi.fn(),
  send: vi.fn(),
  setRequestHeader: vi.fn(),
  withCredentials: false,
  timeout: 0,
  onload: vi.fn(),
  onerror: vi.fn(),
  ontimeout: vi.fn(),
  response: '{}',
  status: 200,
};
vi.stubGlobal('XMLHttpRequest', vi.fn(() => mockXHR));

describe('HTTPTransport', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockXHR.status = 200;
    mockXHR.response = '{}';
  });

  it('создает экземпляр с базовым URL', () => {
    const transport = new HTTPTransport('/api');
    expect(transport).toBeInstanceOf(HTTPTransport);
  });

  it('выполняет GET запрос с параметрами', async () => {
    const transport = new HTTPTransport('/api');
    const promise = transport.get('user', { data: { id: 1 } });

    expect(mockXHR.open).toHaveBeenCalledWith(
      HttpMethods.Get,
      '/api/user?id=1'
    );
    expect(mockXHR.send).toHaveBeenCalled();

    mockXHR.onload();
    await expect(promise).resolves.toEqual({});
  });

  it('обрабатывает ошибки HTTP', async () => {
    const transport = new HTTPTransport('/api');
    const promise = transport.get('user');

    mockXHR.status = 404;
    mockXHR.response = 'Not Found';
    mockXHR.onload();

    await expect(promise).rejects.toBe('Not Found');
  });

  it('обрабатывает сетевые ошибки', async () => {
    const transport = new HTTPTransport('/api');
    const promise = transport.get('user');

    mockXHR.onerror();

    await expect(promise).rejects.toThrow('Network error');
  });

  it('отправляет JSON данные в POST запросе', async () => {
    const transport = new HTTPTransport('/api');
    const data = { name: 'John' };
    transport.post('user', { data });

    expect(mockXHR.setRequestHeader).toHaveBeenCalledWith(
      'Content-Type',
      'application/json'
    );
    expect(mockXHR.send).toHaveBeenCalledWith(JSON.stringify(data));
  });

  it('отправляет FormData без заголовков', async () => {
    const transport = new HTTPTransport('/api');
    const data = new FormData();
    data.append('key', 'value');
    transport.post('user', { data });

    expect(mockXHR.send).toHaveBeenCalledWith(data);
  });

  it('устанавливает таймаут', async () => {
    const transport = new HTTPTransport('/api');
    transport.get('user', { timeout: 5000 });

    expect(mockXHR.timeout).toBe(5000);
  });
});
