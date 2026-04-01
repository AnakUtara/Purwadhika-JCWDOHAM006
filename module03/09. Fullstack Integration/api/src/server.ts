import app from "./app.js";
import { Router, type Request, type Response } from "express";
import { NAME, PORT } from "./config/env.js";

const apiRouter = Router();

app.use("/api", apiRouter);

apiRouter.get("/", (req: Request, res: Response) => {
	console.log(`Welcome to the ${NAME} API server!`);
	res.send({ message: `Welcome to the ${NAME} API server!` });
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
