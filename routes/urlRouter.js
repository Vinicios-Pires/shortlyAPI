import { Router } from "express";

import {
	createShortUrl,
	deleteUrl,
	getUrl,
} from "../controllers/urlController.js";
import { getUser } from "../middlewares/userMiddleware.js";

const urlRouter = Router();

urlRouter.post("/urls/shorten", getUser, createShortUrl);
urlRouter.get("/urls/:id", getUrl);
urlRouter.delete("/urls/:id", getUser, deleteUrl);

export default urlRouter;
