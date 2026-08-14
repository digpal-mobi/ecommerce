import { GetData, PostData } from "@/website/utils/ApiHandlers";
import { stringify } from "node:querystring";

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
  [key: string]: any;
}

export const FetchProducts = async ({
  limit = 9,
  skip = 0,
  ...args
}: FetchProductsParams = {}): Promise<ApiResponse> => {
  try {
    const query = stringify({
      limit,
      skip,
      ...args,
    });

    return await GetData<ApiResponse>(`/products?${query}`);
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

export const FetchProductsByCategory = async (categoryName: string, limit = 4): Promise<ApiResponse> => {
  try {
    const data = await GetData<ApiResponse>(`/products/category/${categoryName}?limit=${limit}`);
    return data;
  } catch (e: any) {
    return { products: [], status: false, message: e.message, token: null };
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
      message: e.message || e.error || "Login failed. Please check your credentials.",
    };
  }
};


export const AddToCart = async(product:any)=>{
  try {
    const data = await PostData<ApiResponse>("/carts/add", product);
    return { status: true, ...data };
  } catch (e: any) {
    return {
      status: false,
      message: e.message || e.error || "Add to cart failed. Please try again.",
    };
  }
};