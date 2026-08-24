import { GetData, PostData, UpdateData } from "@/website/Utils/ApiHandlers";

export interface ApiResponse<T = any> {
  products?: T;
  status?: boolean;
  message?: string;
  token?: string | null;
  [key: string]: any;
}

export interface FetchProductsParams {
  limit?: number;
  skip?: number;
  q?: string;
  category?: string | string[];
  brand?: string | string[];
  sortBy?: string;
  order?: string;
  [key: string]: any;
}

const toQuery = (params: Record<string, unknown>) => {
  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== "") {
      if (Array.isArray(value)) {
        if (value.length > 0) {
          searchParams.set(key, value.join(","));
        }
      } else {
        searchParams.set(key, String(value));
      }
    }
  }
  return searchParams.toString();
};

export const FetchProducts = async ({
  limit = 9,
  skip = 0,
  q,
  category,
  sortBy,
  order,
  ...args
}: FetchProductsParams = {}): Promise<ApiResponse> => {
  try {
    const singleCategory = Array.isArray(category)
      ? category.length > 0
        ? category[0]
        : undefined
      : typeof category === "string" && category.trim()
        ? category.split(",")[0]
        : undefined;

    const query = toQuery({
      limit,
      skip,
      sortBy: sortBy && sortBy !== "featured" ? sortBy : undefined,
      order,
      ...args,
    });

    const path = q
      ? `/products/search?q=${encodeURIComponent(q)}&${query}`
      : singleCategory
        ? `/products/category/${encodeURIComponent(singleCategory)}?${query}`
        : `/products?${query}`;

    const data = await GetData<ApiResponse>(path);
    return { status: true, ...data };
  } catch (e: any) {
    return {
      products: [],
      total: 0,
      status: false,
      message: e.message,
      token: null,
    };
  }
};

export const FetchProductsById = async (id: number): Promise<ApiResponse> => {
  try {
    const data = await GetData<ApiResponse>(`/products/${id}`);
    return data;
  } catch (e: any) {
    return { products: [], status: false, message: e.message, token: null };
  }
};

export const LoginUser = async (credentials: any): Promise<ApiResponse> => {
  try {
    const data = await PostData<ApiResponse>("/auth/login", credentials);
    return { status: true, ...data };
  } catch (e: any) {
    return {
      status: false,
      message:
        e.message ?? e.error ?? "Login failed. Please check your credentials.",
    };
  }
};

export const GetCurrentUserApi = async (
  token: string,
): Promise<ApiResponse> => {
  try {
    const data = await GetData<ApiResponse>("/auth/me", token);
    return { status: true, ...data };
  } catch (e: any) {
    return {
      status: false,
      message: e.message ?? "Failed to fetch user session.",
    };
  }
};

export interface CartItemPayload {
  id: number;
  quantity: number;
}

export interface AddCartPayload {
  userId: number;
  products: CartItemPayload[];
}

export interface UpdateCartPayload {
  merge?: boolean;
  products: CartItemPayload[];
}

export const AddToCartApi = async (
  payload: AddCartPayload,
): Promise<ApiResponse> => {
  try {
    const data = await PostData<ApiResponse>("/carts/add", payload);
    return { status: true, ...data };
  } catch (e: any) {
    return {
      status: false,
      message: e.message ?? e.error ?? "Failed to add to cart.",
    };
  }
};

export const UpdateCartApi = async (
  cartId: number = 1,
  payload: UpdateCartPayload,
): Promise<ApiResponse> => {
  try {
    const data = await UpdateData<ApiResponse>(`/carts/${cartId}`, payload);
    return { status: true, ...data };
  } catch (e: any) {
    return {
      status: false,
      message: e.message ?? e.error ?? "Failed to update cart.",
    };
  }
};

export const GetUserCartApi = async (
  userId: number = 5,
): Promise<ApiResponse> => {
  try {
    const data = await GetData<ApiResponse>(`/carts/user/${userId}`);
    return { status: true, ...data };
  } catch (e: any) {
    return {
      status: false,
      message: e.message ?? e.error ?? "Failed to get user cart.",
    };
  }
};

export const AddToCart = async (product: any) => {
  try {
    const data = await PostData<ApiResponse>("/carts/add", product);
    return { status: true, ...data };
  } catch (e: any) {
    return {
      status: false,
      message: e.message ?? e.error ?? "Add to cart failed. Please try again.",
    };
  }
};

export const FetchCategory = async (): Promise<ApiResponse> => {
  try {
    const data = await GetData<ApiResponse>(`/products/categories`);
    return data;
  } catch (e: any) {
    return { products: [], status: false, message: e.message, token: null };
  }
};

export const FetchSearchedProducts = async ({
  query,
  ...params
}: {
  query: string;
  [key: string]: any;
}) => {
  try {
    const queryString = toQuery({ q: query, ...params });
    const data = await GetData<ApiResponse>(`/products/search?${queryString}`);
    return {
      status: true,
      products: data?.products ?? [],
      total: data?.total ?? (data?.products ?? []).length,
      message: "Success",
    };
  } catch (e: any) {
    return {
      products: [],
      total: 0,
      status: false,
      message: e.message,
      token: null,
    };
  }
};

export const FetchProductsByCategory = async (
  categoryName: string,
  limit = 4,
): Promise<ApiResponse> => {
  try {
    const data = await GetData<ApiResponse>(
      `/products/category/${categoryName}?limit=${limit}`,
    );
    return data;
  } catch (e: any) {
    return { products: [], status: false, message: e.message, token: null };
  }
};
