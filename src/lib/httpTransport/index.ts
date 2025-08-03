import { HttpMethod, type IRequestOptions, type THttpRequest, type TQueryParams } from "./types";
import { queryStringify } from "./utils";

class HTTPTransport {
  get = this.#createMethod(HttpMethod.Get);
  post = this.#createMethod(HttpMethod.Post);
  put = this.#createMethod(HttpMethod.Put);
  patch = this.#createMethod(HttpMethod.Patch);
  delete = this.#createMethod(HttpMethod.Delete);

  #createMethod(method: HttpMethod): THttpRequest {
    return (url, options = {}) => this.#request(url, { ...options, method });
  }

  #request<R>(
    url: string,
    options: IRequestOptions<TQueryParams>
  ): Promise<R> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const { method, data, headers, timeout } = options;

      if (method === HttpMethod.Get && data) {
        url += queryStringify(data);
      }

      xhr.open(method, url);

      if (headers) {
        Object.entries(headers).forEach(([key, value]) => {
          xhr.setRequestHeader(key, value);
        });
      }

      xhr.timeout = timeout;
      xhr.ontimeout = (): void => reject(new Error(`Request timed out after ${timeout}ms`));
      xhr.onload = (): void => resolve(xhr);
      xhr.onerror = (): void => reject(new Error("Network error"));

      if (method !== HttpMethod.Get && data) {
        let body = data;
        if (typeof data === 'object' && !headers['Content-Type']) {
          xhr.setRequestHeader('Content-Type', 'application/json');
          body = JSON.stringify(data);
        }
        xhr.send(body);
      } else {
        xhr.send();
      }
    });
  }
}

export default HTTPTransport;
