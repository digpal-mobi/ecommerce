import { Router } from "express";
import { authController } from "./auth.controller";
import { validateRequest } from "../../middlewares/validate.middleware";
import { loginSchema, registerSchema } from "./auth.validations";

const router = Router();

router.post("/login", validateRequest(loginSchema), authController.loginUser);
router.post("/register", validateRequest(registerSchema), authController.registerUser);
// router.get("/refresh", AuthController.refreshToken)

export default router;