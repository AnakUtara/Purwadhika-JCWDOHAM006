import express, {
	Application,
	NextFunction,
	Request,
	Response,
	Router,
} from "express";

const app: Application = express();
// Mengkomposisikan router dengan menggunakan express.Router()
const apiRouter: Router = express.Router();
const postsRouter: Router = express.Router();
const PORT: number = 8000;

app.use("/api", apiRouter);

// Route level middleware
// Bisa dipakai ulang untuk berbagai route yang membutuhkan middleware yang sama

const sampleMiddleware = (req: Request, res: Response, next: NextFunction) => {
	console.log("Sample middleware executed");
	next();
};

apiRouter.get(
	"/",
	sampleMiddleware,
	(_req: Request, res: Response, next: NextFunction) => {
		next(new Error("Error on API router"));
		// res.send({ message: "Welcome to API router" });
	},
);

apiRouter.use("/posts", postsRouter);

postsRouter.get("/", (req: Request, res: Response, next: NextFunction) => {
	// Query Params
	const { name } = req.query;
	if (name) {
		console.log("name: ", name);
		res.send({ message: `Hello ${name}, welcome to posts router` });
	} else {
		next(new Error("Error on Posts router"));
	}
	// res.send({ message: "Get all posts" });
});

postsRouter.get("/:id", (req: Request, res: Response) => {
	const { id } = req.params;
	res.send({ message: `Get post with id: ${id}` });
});

// Route Params
app.get("/:id/:name", (req: Request, res: Response) => {
	const { id, name } = req.params;
	console.log("id: ", id, "name: ", name);

	res.send({ message: `Hello ${name}, your id is ${id}` });
});

// 404 Not Found Handler
app.use((_req: Request, res: Response) => {
	res.status(404).send({ message: "Route not found" });
});

// Application wide Error handling
app.use(
	(
		error: Error | unknown,
		_req: Request,
		res: Response,
		_next: NextFunction,
	) => {
		console.error("Error: ", error);
		res.status(500).send({ message: "Internal Server Error" });
	},
);

app.listen(PORT, () => {
	console.log(`App is running on port: ${PORT}`);
});
