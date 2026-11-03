import { Request, Response } from "express";
import { productService } from "./product.service";
import { asyncHandler } from "../../utils/asyncHandler";
import { ApiResponse } from "../../utils/ApiResponse";

export class ProductController {
  getProducts = asyncHandler(async (_req: Request, res: Response) => {
    const products = await productService.getAllProducts();
    res.status(200).json(new ApiResponse(200, products, "Products fetched successfully"));
  });

  getProductById = asyncHandler(async (req: Request, res: Response) => {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const product = await productService.getProductById(id);
    res.status(200).json(new ApiResponse(200, product, "Product fetched successfully"));
  });

  createProduct = asyncHandler(async (req: Request, res: Response) => {
    const product = await productService.createProduct(req.body);
    res.status(201).json(new ApiResponse(201, product, "Product created successfully"));
  });
}

export const productController = new ProductController();
