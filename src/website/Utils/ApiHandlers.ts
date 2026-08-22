import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "";

type Headers = Record<string, string>;

const buildHeaders = (
  token?: string,
  headers: Headers = {}
): Headers => {
  const defaultHeaders: Headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  if (token) {
    defaultHeaders.Authorization = `Bearer ${token}`;
  }

  return {
    ...defaultHeaders,
    ...headers,
  };
};

const handleError = (error: AxiosError) => {
  if (error.response) {
    throw error.response.data;
  }

  if (error.request) {
    throw new Error("No response received from server.");
  }

  throw new Error(error.message || "Something went wrong.");
};

const request = async <T>(
  method: AxiosRequestConfig["method"],
  url: string,
  data?: unknown,
  token?: string,
  headers: Headers = {},
  responseType?: AxiosRequestConfig["responseType"]
): Promise<T> => {
  try {
    const config: AxiosRequestConfig = {
      method,
      url: `${API_BASE}${url}`,
      headers: buildHeaders(token, headers),
      data,
      responseType,
    };

    const response: AxiosResponse<T> = await axios(config);

    // Store login token if required
    if (
      url === "/auth/v1/login" &&
      response.headers.authorization
    ) {
      localStorage.setItem("token", response.headers.authorization);
    }

    return response.data;
  } catch (error) {
    handleError(error as AxiosError);
    throw error;
  }
};

// GET
export const GetData = <T>(
  url: string,
  token?: string,
  headers?: Headers
) => request<T>("get", url, undefined, token, headers);

// POST
export const PostData = <T>(
  url: string,
  data?: unknown,
  token?: string,
  headers?: Headers
) => request<T>("post", url, data, token, headers);

// PUT
export const UpdateData = <T>(
  url: string,
  data?: unknown,
  token?: string,
  headers?: Headers
) => request<T>("put", url, data, token, headers);

// PATCH
export const PatchData = <T>(
  url: string,
  data?: unknown,
  token?: string,
  headers?: Headers
) => request<T>("patch", url, data, token, headers);

// DELETE
export const DeleteData = <T>(
  url: string,
  data?: unknown,
  token?: string,
  headers?: Headers
) => request<T>("delete", url, data, token, headers);
