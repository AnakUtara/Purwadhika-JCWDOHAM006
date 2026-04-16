import transporter from "../libs/nodemailer.js";
class EmailService {
    sendMail(to, subject, html) {
        transporter.sendMail({
            to,
            subject,
            html,
        });
    }
    sendMailWithAttachment(to, subject, html, attachments) {
        transporter.sendMail({
            to,
            subject,
            html,
            attachments,
        });
    }
}
export default EmailService;
