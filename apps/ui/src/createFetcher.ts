import { Endpoint, type Method } from '@cloudretail/api';

const fetchJson = async <RequestBody, ResponseBody>(
  method: Method,
  url: string,
  body?: RequestBody,
) => {
  const response = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: method !== 'get' && body ? JSON.stringify(body) : undefined,
  });

  if (response.ok) {
    return response.json() as Promise<ResponseBody>;
  }

  throw new Error(response.statusText);
};

export const createFetcher = <Fetcher>(endpoint: Endpoint<{}>) => {
  const fetcher = ({
    params,
    body,
  }: {
    params: Record<string, string>;
    body: Record<string, unknown>;
  }) => fetchJson(endpoint.method, `/api${endpoint.toPath(params)}`, body);

  return fetcher as Fetcher;
};
