import { Router } from "express";

import { createShortUrl, getUrl } from "../controllers/urlController.js";
import { getUser } from "../middlewares/userMiddleware.js";

const urlRouter = Router();

urlRouter.post("/urls/shorten", getUser, createShortUrl);
urlRouter.get("/urls/:id", getUrl);

export default urlRouter;
