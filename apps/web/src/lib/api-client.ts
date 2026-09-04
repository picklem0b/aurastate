const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4002";

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
    throw new Error(body?.error ?? `API error ${res.status}`);
  }

  return res.json() as Promise<T>;
}

export const api = {
  get: <T>(path: string, opts?: RequestOptions) =>
    request<T>(path, { method: "GET", ...opts }),
  post: <T>(path: string, data: unknown, opts?: RequestOptions) =>
    request<T>(path, { method: "POST", body: JSON.stringify(data), ...opts }),
  put: <T>(path: string, data: unknown, opts?: RequestOptions) =>
    request<T>(path, { method: "PUT", body: JSON.stringify(data), ...opts }),
  delete: <T>(path: string, opts?: RequestOptions) =>
    request<T>(path, { method: "DELETE", ...opts }),
};

// ── Typed API methods ────────────────────────────────────
export const authApi = {
  me: () => api.get<{ user: any }>("/auth/me"),
  sync: (data: { fullName: string; email: string; username: string }) =>
    api.post<{ user: any }>("/auth/sync", data),
};

export const onboardingApi = {
  region: (code: string) => api.get<{ config: any }>(`/onboarding/region/${code}`),
  complete: (data: any) => api.post<{ status: string }>("/onboarding/complete", data),
};

export const calendarApi = {
  schedule: () => api.get<{ blocks: any[] }>("/calendar/schedule"),
  generate: (data?: any) => api.post<{ blocks: any[]; generatedAt: string }>("/calendar/generate", data ?? {}),
};

export const educationApi = {
  socratic: (data: any) => api.post<{ question: string }>("/education/socratic/respond", data),
  topics: (subject: string, grade: number) =>
    api.get<{ topics: any[] }>(`/education/topics/${subject}/${grade}`),
  material: (topicId: string) =>
    api.get<any>(`/education/material/${topicId}`),
};

export const focusApi = {
  start: (data: { subject: string; plannedDurationMinutes: number }) =>
    api.post<{ sessionId: string; status: string }>("/focus/session/start", data),
  end: (data: any) =>
    api.post<{ status: string; xpNet: number }>("/focus/session/end", data),
  sessions: () => api.get<{ sessions: any[] }>("/focus/sessions"),
};

export const masteryApi = {
  tree: () => api.get<{ subjects: any[]; weakPoints: any[] }>("/mastery/tree"),
  update: (data: { subject: string; concept: string; correct: number; total: number }) =>
    api.post<{ subject: string; newMasteryPct: number; isWeak: boolean }>("/mastery/update", data),
};

export const socialApi = {
  rooms: () => api.get<{ rooms: any[] }>("/social/rooms"),
  createRoom: (data: any) => api.post<{ room: any }>("/social/rooms", data),
  messages: (roomId: string, limit?: number) =>
    api.get<{ messages: any[] }>(`/social/rooms/${roomId}/messages?limit=${limit ?? 50}`),
  sendMessage: (roomId: string, data: { content: string; threadId?: string }) =>
    api.post<{ message: any }>(`/social/rooms/${roomId}/messages`, data),
};
