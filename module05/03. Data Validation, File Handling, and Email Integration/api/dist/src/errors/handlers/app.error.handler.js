import AppError from "../app.error.js";
import { ZodError } from "zod/v4";
export const appErrorHandler = (error, next) => {
    if (error instanceof ZodError) {
        const messages = error.issues
            .map((err) => `${err.path.join(" ")}: ${err.message}`)
            .join(", ");
        return next(new AppError(messages, 400, error));
    }
    return next(error);
};
