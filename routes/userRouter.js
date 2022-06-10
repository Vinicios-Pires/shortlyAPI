import { Router } from "express";

import { getUserById } from "../controllers/userController.js";

import { getUser } from "../middlewares/userMiddleware.js";

const userRouter = Router();

userRouter.get("/users/:id", getUser, getUserById);

export default userRouter;
