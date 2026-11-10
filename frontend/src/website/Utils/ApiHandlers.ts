import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "";

type Headers = Record<string, string>;

interface RetryableRequest extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

// Redux token getter (will be registered by the Redux store)
let getAccessToken: () => string | null = () => null;
let onAccessToken: (token: string) => void = () => {};
let onLogout: () => void = () => {};

export const setAccessTokenGetter = (getter: () => string | null) => {
  getAccessToken = getter;
};

export const setAuthHandlers = (handlers: {
  onAccessToken: (token: string) => void;
  onLogout: () => void;
}) => {
  onAccessToken = handlers.onAccessToken;
  onLogout = handlers.onLogout;
};

const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

let refreshPromise: Promise<string> | null = null;

const refreshAccessToken = () => {
  if (!refreshPromise) {
    refreshPromise = api
      .post("/auth/refresh")
      .then((response) => {
        const newAccessToken = response.data?.data?.accessToken as
          | string
          | undefined;

        if (!newAccessToken) {
          throw new Error("Unable to refresh session");
        }

        onAccessToken(newAccessToken);
        return newAccessToken;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
};

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryableRequest | undefined;

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/auth/refresh") &&
      !originalRequest.url?.includes("/auth/login") &&
      !originalRequest.url?.includes("/auth/logout")
    ) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshAccessToken();
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        onLogout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

const handleError = (error: AxiosError) => {
  if (error.response) {
    throw error.response.data;
  }

  if (error.request) {
    throw new Error("No response received from server.");
  }

  throw new Error(error.message ?? "Something went wrong.");
};

const request = async <T>(
  method: AxiosRequestConfig["method"],
  url: string,
  data?: unknown,
  headers: Headers = {},
  responseType?: AxiosRequestConfig["responseType"],
): Promise<T> => {
  try {
    const config: AxiosRequestConfig = {
      method,
      url,
      data,
      headers,
      responseType,
    };

    const response: AxiosResponse<T> = await api(config);

    return response.data;
  } catch (error) {
    handleError(error as AxiosError);
    throw error;
  }
};

// GET
export const GetData = <T>(url: string, headers?: Headers) =>
  request<T>("get", url, undefined, headers);

// POST
export const PostData = <T>(
  url: string,
  data?: unknown,
  headers?: Headers,
) => request<T>("post", url, data, headers);

// PUT
export const UpdateData = <T>(
  url: string,
  data?: unknown,
  headers?: Headers,
) => request<T>("put", url, data, headers);

// PATCH
export const PatchData = <T>(
  url: string,
  data?: unknown,
  headers?: Headers,
) => request<T>("patch", url, data, headers);

// DELETE
export const DeleteData = <T>(
  url: string,
  data?: unknown,
  headers?: Headers,
) => request<T>("delete", url, data, headers);