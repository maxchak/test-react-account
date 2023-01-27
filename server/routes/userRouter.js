import { Router } from "express";

import { userController } from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.patch("/", authMiddleware, userController.updateInfo);
router.patch("/change_password", authMiddleware, userController.changePassword);

export default router;
