import { Router } from "express";

import AuthRouter from "./authRouter.js";
import UserRouter from "./userRouter.js";

const router = Router();

router.use("/auth", AuthRouter);
router.use("/user", UserRouter);

export default router;
