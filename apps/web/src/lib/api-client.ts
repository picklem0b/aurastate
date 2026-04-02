const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

interface RequestOptions extends RequestInit {
  token?: string;
}

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { token, ...init } = options;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...init.headers,
  };

  const res = await fetch(`${BASE_URL}${path}`, { ...init, headers });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body?.detail ?? `API error ${res.status}`);
  }

  return res.json() as Promise<T>;
}

export const api = {
  get:    <T>(path: string, opts?: RequestOptions) =>
    request<T>(path, { method: "GET",    ...opts }),
  post:   <T>(path: string, data: unknown, opts?: RequestOptions) =>
    request<T>(path, { method: "POST",   body: JSON.stringify(data), ...opts }),
  put:    <T>(path: string, data: unknown, opts?: RequestOptions) =>
    request<T>(path, { method: "PUT",    body: JSON.stringify(data), ...opts }),
  delete: <T>(path: string, opts?: RequestOptions) =>
    request<T>(path, { method: "DELETE", ...opts }),
};
