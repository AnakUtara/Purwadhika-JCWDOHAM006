import "dotenv/config";

const NAME = process.env.APP_NAME || "api";
const PORT = process.env.APP_PORT || 8000;
const ENV = process.env.APP_ENV || "development";

const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5173";

export { NAME, PORT, ENV, CLIENT_ORIGIN };
