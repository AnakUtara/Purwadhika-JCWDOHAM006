import express from "express";
import type { Application } from "express";
import cors from "cors";
import { CLIENT_ORIGIN } from "./config/env.js";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
	cors({
		origin: CLIENT_ORIGIN,
		credentials: true,
	}),
);

export default app;
