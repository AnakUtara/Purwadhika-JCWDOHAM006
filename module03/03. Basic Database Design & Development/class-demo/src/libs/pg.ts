import { Pool } from "pg";
import {
	PGDATABASE,
	PGHOST,
	PGPASSWORD,
	PGPORT,
	PGUSER,
} from "../config/env.config.js";

const pool = new Pool({
	host: PGHOST,
	user: PGUSER,
	password: PGPASSWORD,
	database: PGDATABASE,
	port: PGPORT,
});

export default pool;
