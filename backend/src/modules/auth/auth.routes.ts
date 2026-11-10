import { Router } from "express";
import { authController } from "./auth.controller";
import { validateRequest } from "../../middlewares/validate.middleware";
import { loginSchema, registerSchema, resetPasswordSchema, verifyEmailSchema } from "./auth.validations";
import { authenticate } from "../../middlewares/auth.middleware";

const router = Router();

router.post("/login", validateRequest(loginSchema), authController.loginUser);
router.post("/register", validateRequest(registerSchema), authController.registerUser);
router.post("/verify-email", validateRequest(verifyEmailSchema), authController.verifyEmail);
router.get("/me", authenticate, authController.getCurrentUser);
router.post("/refresh", authController.refreshToken);
router.post("/logout", authController.logout);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", validateRequest(resetPasswordSchema), authController.resetPassword);

export default router;