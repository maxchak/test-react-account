import { Router } from "express";

import { authController } from "../controllers/authController.js";

const router = Router();

router.post("/signup", authController.registration);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.get("/refresh", authController.refresh);

export default router;
