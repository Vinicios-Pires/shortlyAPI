import { Router } from "express";

import { signUp, signIn } from "../controllers/authController.js";
import {
	validateSignIn,
	validateSignUp,
} from "../middlewares/validateAuthMiddleware.js";

const authRouter = Router();

authRouter.post("/signup", validateSignUp, signUp);
authRouter.post("/signin", validateSignIn, signIn);

export default authRouter;
