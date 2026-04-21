import "dotenv/config";

const APP_PORT: number = Number(process.env.APP_PORT) || 8000;
const APP_HOST: string = process.env.APP_HOST || "localhost";
const APP_ENV: string = process.env.APP_ENV || "development";
const IS_PROD: boolean = APP_ENV === "production";
const DB_URL: string = process.env.DATABASE_URL || "";
const REDIS_HOST: string = process.env.REDIS_HOST || "localhost";
const REDIS_PORT: number = Number(process.env.REDIS_PORT) || 6379;
const REDIS_PASSWORD: string = process.env.REDIS_PASSWORD || "";
const REDIS_DB: number = Number(process.env.REDIS_DB) || 0;

export {
	APP_PORT,
	APP_HOST,
	APP_ENV,
	IS_PROD,
	DB_URL,
	REDIS_HOST,
	REDIS_PORT,
	REDIS_PASSWORD,
	REDIS_DB,
};
