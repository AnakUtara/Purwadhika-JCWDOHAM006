import "dotenv/config";

const APP_NAME = process.env.APP_NAME || "websocket-api";
const APP_PORT = process.env.APP_PORT || 8000;
const APP_ENV = process.env.APP_ENV || "development";

const IS_PRODUCTION = APP_ENV === "production";

const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5173";

const REDIS_HOST: string = process.env.REDIS_HOST || "localhost";
const REDIS_PORT: number = Number(process.env.REDIS_PORT) || 6379;
const REDIS_PASSWORD: string = process.env.REDIS_PASSWORD || "";
const REDIS_DB: number = Number(process.env.REDIS_DB) || 0;

export {
	APP_NAME,
	APP_PORT,
	APP_ENV,
	IS_PRODUCTION,
	CLIENT_ORIGIN,
	REDIS_HOST,
	REDIS_PORT,
	REDIS_PASSWORD,
	REDIS_DB,
};
