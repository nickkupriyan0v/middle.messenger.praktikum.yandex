export enum HttpMethod {
  Get = "GET",
  Post = "POST",
  Put = "PUT",
  Patch = "PATCH",
  Delete = "DELETE",
}

export type TQueryParams = Record<string, string | number | boolean>;

export interface IRequestOptions<Q = TQueryParams, D = XMLHttpRequestBodyInit> {
  method: HttpMethod;
  timeout: number;
  headers: Record<string, string>;
  data: D;
  query: Q;
  signal: AbortSignal;
}

export type THttpRequest = <R = unknown>(
  url: string,
  options?: Partial<IRequestOptions<TQueryParams>>
) => Promise<R>;
