import nodemailer from "nodemailer";
import { NodeMailerEmail, NodeMailerPassword } from "../config/app.config";
import { join } from "path";
import fs from "fs";
import { compile } from "handlebars";

export const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: NodeMailerEmail,
		pass: NodeMailerPassword,
	},
});

export async function sendEmail({
	to,
	templateName,
	href,
	subject,
}: {
	to: string;
	subject: string;
	href: string;
	templateName: string;
}) {
	const template = await fs.promises.readFile(
		join(__dirname, "../templates/", templateName),
		"utf-8"
	);
	if (template) {
		const html = compile(template)({
			email: to,
			href,
		});
		await transporter.sendMail({
			to,
			subject,
			html,
		});
	}
}
