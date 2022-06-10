import { Router } from "express";

import {
	createShortUrl,
	deleteUrl,
	getRanking,
	getUrl,
} from "../controllers/urlController.js";

import { getUser } from "../middlewares/userMiddleware.js";

const urlRouter = Router();

urlRouter.post("/urls/shorten", getUser, createShortUrl);
urlRouter.get("/urls/:id", getUrl);
urlRouter.delete("/urls/:id", getUser, deleteUrl);
urlRouter.get("/ranking", getRanking);

export default urlRouter;
