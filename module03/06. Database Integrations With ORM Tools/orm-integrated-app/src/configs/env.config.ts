import "dotenv/config";

const appName = process.env.APP_NAME || "default-app-name";
const PORT = process.env.APP_PORT ? parseInt(process.env.APP_PORT) : 8000;

export { appName, PORT };
