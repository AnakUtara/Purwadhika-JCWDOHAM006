import express, { type Application } from "express";

const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export const apiRouter = express.Router();
app.use("/api", apiRouter);

export default app;
