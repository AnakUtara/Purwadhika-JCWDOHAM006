import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./presentation/routes/user.routes";
import taskRoutes from "./presentation/routes/task.routes";
import authRoutes from "./presentation/routes/auth.routes";

const app = express();

app.use(
	cors({
		origin: process.env.CORS_ORIGIN || "http://localhost:5173",
		credentials: true,
	}),
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (_req, res) => res.json({ ok: true }));

app.use(
	(
		err: any,
		_req: express.Request,
		res: express.Response,
		_next: express.NextFunction,
	) => {
		console.error(err);
		res.status(500).json({ error: "Internal Server Error" });
	},
);

export default app;
