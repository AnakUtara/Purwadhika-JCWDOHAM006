import dotenv from "dotenv";

dotenv.config();

const appName = process.env.APP_NAME || "default-app-name";
const PORT = process.env.APP_PORT ? parseInt(process.env.APP_PORT) : 8000;

// Database configuration

const PGHOST = process.env.PGHOST || "localhost";
const PGDATABASE = process.env.PGDATABASE || "mydb";
const PGUSER = process.env.PGUSER || "postgres";
const PGPASSWORD = process.env.PGPASSWORD || "password";
const PGSSLMODE = process.env.PGSSLMODE || "disable";
const PGCHANNELBINDING = process.env.PGCHANNELBINDING || "prefer";
const PGPORT: number = process.env.PGPORT ? parseInt(process.env.PGPORT) : 5432;

export {
	appName,
	PORT,
	PGHOST,
	PGDATABASE,
	PGUSER,
	PGPASSWORD,
	PGSSLMODE,
	PGCHANNELBINDING,
	PGPORT,
};
