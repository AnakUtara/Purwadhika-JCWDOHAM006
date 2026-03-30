import "dotenv/config";

const APP_NAME = process.env.APP_NAME || "MyApp";
const PORT = process.env.PORT || 8000;
const DATABASE_URL =
	process.env.DATABASE_URL ||
	"postgresql://user:password@localhost:5432/mydb?schema=public";
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

const NodeMailerEmail =
	process.env.NODEMAILER_EMAIL || "your_email@example.com";
const NodeMailerPassword =
	process.env.NODEMAILER_PASSWORD || "your_email_password";

export {
	APP_NAME,
	PORT,
	DATABASE_URL,
	JWT_SECRET,
	NodeMailerEmail,
	NodeMailerPassword,
};
