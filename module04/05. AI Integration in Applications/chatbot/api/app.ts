import express, {
	Router,
	type Application,
	type Request,
	type Response,
} from "express";
import { OPENROUTER_MODEL } from "./src/configs/env.config.js";
import { streamText, type ModelMessage } from "ai";
import openRouter from "./src/libs/openrouter.js";
import { prisma } from "./src/libs/prisma.client.js";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const apiRouter = Router();

app.use("/api", apiRouter);

apiRouter.get("/sessions/:id", async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const session = await prisma.chatSession.findUnique({
			where: { id: String(id) },
			include: { messages: true },
		});

		if (!session) {
			return res.status(404).send({ error: "Chat session not found" });
		}

		res.send({
			message: `Chat session id: ${id} retrieved successfully`,
			data: session,
		});
	} catch (error) {
		if (error instanceof PrismaClientKnownRequestError) {
			return res.status(404).send({ error: "Chat session not found" });
		}
		console.error("Error retrieving chat session:", error);
		res.status(500).send({ error: "Internal Server Error" });
	}
});

apiRouter.post("/sessions", async (_req: Request, res: Response) => {
	try {
		const session = await prisma.chatSession.create({});
		res.send({ sessionId: session.id });
	} catch (error) {
		console.error("Error creating chat session:", error);
		res.status(500).send({ error: "Internal Server Error" });
	}
});

apiRouter.post("/sessions/:id/chat", async (req: Request, res: Response) => {
	const { messages, model = OPENROUTER_MODEL } = req.body;
	const { id: chatId } = req.params;

	const result = streamText({
		model: openRouter(model),
		messages: messages as ModelMessage[],
		onFinish: async ({ text }) => {
			try {
				await prisma.message.createMany({
					data: [
						{
							role: "user",
							content: messages[messages.length - 1].content,
							sessionId: chatId as string,
						},
						{ role: "assistant", content: text, sessionId: chatId as string },
					],
				});
			} catch (error) {
				console.error("Error saving messages to database:", error);
			}
		},
	});

	result.pipeTextStreamToResponse(res);
});

app.listen(8000, () => {
	console.log("Server is running on port 8000");
});

export default app;
