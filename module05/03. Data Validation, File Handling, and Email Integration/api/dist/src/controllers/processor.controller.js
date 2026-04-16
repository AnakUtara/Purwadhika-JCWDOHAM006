import AppError from "../errors/app.error.js";
import { appErrorHandler } from "../errors/handlers/app.error.handler.js";
import sharp from "sharp";
import { responseBuilder } from "../utils/response.builder.js";
import ProcessorService from "../services/processor.service.js";
import EmailService from "../services/email.service.js";
import renderTemplate from "../libs/handlebars.js";
import compressionValidation, {} from "../validations/compression.validation.js";
import { clientOrigin } from "../config/env.config.js";
class ProcessorController {
    processorService = new ProcessorService();
    emailService = new EmailService();
    compressImageAndSendWithEmail = async (req, res, next) => {
        try {
            if (!req.file)
                throw new AppError("No file uploaded", 400);
            const { email, shrinkLevel } = await compressionValidation.parseAsync(req.body);
            const compressedImage = await this.processorService.compressImage(req.file, shrinkLevel);
            // attach the compressed image to an email via nodemailer
            this.emailService.sendMailWithAttachment(email, "Enjoy your shrunk image!", renderTemplate("shrink-done.hbs", {
                siteUrl: clientOrigin,
                year: new Date().getFullYear(),
            }), [
                {
                    filename: this.processorService.changeFilename(req.file.originalname, `_shrink_q_${shrinkLevel}`),
                    content: compressedImage,
                },
            ]);
            return res.send(responseBuilder(200, `Image compressed successfully & sent to ${email}!`, null));
        }
        catch (error) {
            appErrorHandler(error, next);
        }
    };
}
export default new ProcessorController();
