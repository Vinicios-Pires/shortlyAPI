import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";

import db from "./config/db.js";

import authRouter from "./routes/authRouter.js";
import urlRouter from "./routes/urlRouter.js";
import userRouter from "./routes/userRouter.js";

const app = express();
app.use(cors());
app.use(json());
dotenv.config();

app.use(authRouter);
app.use(urlRouter);
app.use(userRouter);

const port = process.env.PORT || 4000;
app.listen(port, () => {
	console.log(`Servidor aberto em: http://localhost:${port}`);
});
