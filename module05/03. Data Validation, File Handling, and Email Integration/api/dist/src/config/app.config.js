import express from "express";
import { appPort } from "./env.config.js";
import cors from "cors";
import corsOptions from "../middlewares/express/cors.js";
const app = express();
const PORT = appPort;
//Middleware Configuration
app.set("trust proxy", 1); // Trust first proxy (if behind a reverse proxy like Nginx or Heroku)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
export default app;
export { PORT };
