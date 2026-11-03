import { Router } from "express";
import { productController } from "./product.controller";
import { validateRequest } from "../../middlewares/validate.middleware";
import { validateCreateProduct } from "./product.validation";

const router = Router();

router.get("/", productController.getProducts);
router.get("/:id", productController.getProductById);
router.post("/", validateRequest(validateCreateProduct), productController.createProduct);

export default router;

