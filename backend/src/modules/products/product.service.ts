import { ProductModel, IProduct } from "./product.model";
import { ApiError } from "../../utils/ApiError";

export class ProductService {
  async getAllProducts(): Promise<IProduct[]> {
    return ProductModel.find();
  }

  async getProductById(id: string): Promise<IProduct> {
    const product = await ProductModel.findById(id);
    if (!product) {
      throw new ApiError(404, "Product not found");
    }
    return product;
  }

  async createProduct(data: Partial<IProduct>): Promise<IProduct> {
    return ProductModel.create(data);
  }
}

export const productService = new ProductService();

