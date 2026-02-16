import Constants from "expo-constants";
import { Platform } from "react-native";

function normalizeBaseUrl(url: string) {
  return url.replace(/\/$/, "");
}

export function getApiBaseUrl() {
  const fromEnv = process.env.EXPO_PUBLIC_API_URL;
  if (fromEnv) return normalizeBaseUrl(fromEnv);

  const defaultPort = 3015;

  // When running in Expo Go / dev, this often contains your machine LAN IP.
  const debuggerHost = (Constants as any)?.expoGoConfig?.debuggerHost as string | undefined;
  if (debuggerHost) {
    const host = debuggerHost.split(":")[0];
    if (host) return `http://${host}:${defaultPort}`;
  }

  // Dev defaults
  if (Platform.OS === "android") return `http://10.0.2.2:${defaultPort}`; // Android emulator
  return `http://localhost:${defaultPort}`; // iOS simulator / web
}

export function resolveMediaUrl(url: string | undefined | null) {
  if (!url) return url ?? "";

  // If data in DB was stored as http://localhost:PORT/... it won't work on a phone.
  // Rewrite it to the current API base host.
  try {
    const base = new URL(getApiBaseUrl());
    const u = new URL(url);
    if (u.hostname === "localhost" || u.hostname === "127.0.0.1") {
      u.protocol = base.protocol;
      u.hostname = base.hostname;
      u.port = base.port;
      return u.toString();
    }
    return url;
  } catch {
    return url;
  }
}

export async function uploadImages(uris: Array<{ uri: string; name?: string; type?: string }>) {
  const form = new FormData();
  for (const file of uris) {
    const name = file.name ?? `image-${Date.now()}.jpg`;
    const type = file.type ?? "image/jpeg";

    form.append("images", {
      uri: file.uri,
      name,
      type,
    } as any);
  }

  const res = await fetch(`${getApiBaseUrl()}/services/upload`, {
    method: "POST",
    body: form,
  });

  const json = await res.json().catch(() => ({}));
  if (!res.ok || json?.success === false) {
    throw new Error(json?.message ?? `Upload failed (${res.status})`);
  }

  const urls: string[] = (json.files ?? []).map((f: any) => f.url).filter(Boolean);
  return urls;
}

export type ServiceImage = {
  id: number;
  serviceId: number;
  url: string;
  sortOrder: number;
};

export type Service = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: "lamp" | "chair" | "table" | "sofa" | "bed" | "other";
  images?: ServiceImage[];
};

export async function createService(payload: {
  title: string;
  price: number;
  description: string;
  category: "lamp" | "chair" | "table" | "sofa" | "bed" | "other";
  images?: string[];
}) {
  const res = await fetch(`${getApiBaseUrl()}/services`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const json = await res.json().catch(() => ({}));
  if (!res.ok || json?.success === false) {
    throw new Error(json?.message ?? `Create failed (${res.status})`);
  }

  return json.data;
}

export async function getServices() {
  const res = await fetch(`${getApiBaseUrl()}/services`, { method: "GET" });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || json?.success === false) {
    throw new Error(json?.message ?? `Fetch failed (${res.status})`);
  }
  return (json.data ?? []) as Service[];
}

export async function getServiceById(id: string | number) {
  const res = await fetch(`${getApiBaseUrl()}/services/${id}`, { method: "GET" });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || json?.success === false) {
    throw new Error(json?.message ?? `Fetch failed (${res.status})`);
  }
  return json.data as Service;
}
