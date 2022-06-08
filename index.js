import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
app.use(cors());
app.use(json());
dotenv.config();

const port = process.env.PORT || 4000;
app.listen(port, () => {
	console.log(`Servidor aberto em: http://localhost:${port}`);
});
