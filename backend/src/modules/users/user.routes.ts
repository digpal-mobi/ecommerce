import { Router } from "express";
import { userController } from "./user.controller";

const router = Router();

router.get("/", userController.getUsers);
router.get("/:id", userController.getUserById);
// router.post("/profile", userController.updateProfile);

export default router;

