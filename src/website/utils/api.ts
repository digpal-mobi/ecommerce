import { GetData } from "@/website/utils/ApiHandlers";
import { stringify } from "querystring";

export interface ApiResponse<T = any> {
  products?: T;
  status?: boolean;
  message?: string;
  token?: string | null;
}

export const FetchProducts = async ({limit = 9, skip = 9, ...args}): Promise<ApiResponse> => {
  try {
    const data = await GetData<ApiResponse>(`/products?limit=${limit}&${stringify(args)}`);
    return data;
  } catch (e: any) {
    return { products: [], status: false, message: e.message, token: null };
  }
};

export const FetchProductsByCategory = async (categoryName: String, limit = 9): Promise<ApiResponse> => {
  try {
    const data = await GetData<ApiResponse>(`/products/category/${categoryName}?limit=${limit}`);
    return data;
  } catch (e: any) {
    return { products: [], status: false, message: e.message, token: null };
  }
};

export const FetchProductsById = async (id: Number): Promise<ApiResponse> => {
  try {
    const data = await GetData<ApiResponse>(`/products/${id}`);
    return data;
  } catch (e: any) {
    return { products: [], status: false, message: e.message, token: null };
  }
};
