import { Request } from "express";
import multer from "multer";
import { join } from "path";
import AppError from "../../errors/app.error";

type DestinationCallback = (error: Error | null, destination: string) => void;
type FilenameCallback = (error: Error | null, filename: string) => void;
type FileFilterCallback = (error?: Error | null, acceptFile?: boolean) => void;

export const uploader = (
	filePrefix: string,
	folderName?: string,
	acceptedMimeTypes: string[] = ["image/png", "image/jpeg", "image/webp"],
	maxFileSize: number = 1.5
) => {
	const defaultDir = join(__dirname, "../../../public/");

	const storage = multer.diskStorage({
		destination: (
			_: Request,
			__: Express.Multer.File,
			cb: DestinationCallback
		) => {
			const destination = folderName ? defaultDir + folderName : defaultDir;
			cb(null, destination);
		},
		filename: (
			req: Request,
			file: Express.Multer.File,
			cb: FilenameCallback
		) => {
			const originalNameParts = file.originalname.split(".");
			const fileExtension = originalNameParts.at(-1);
			const { slug } = req.body;
			const newFileName = `${filePrefix}-${
				slug ? `${slug}-` : ""
			}${Date.now()}.${fileExtension}`;
			cb(null, newFileName);
		},
	});

	const fileFilter = (
		_: Request,
		file: Express.Multer.File,
		cb: FileFilterCallback
	) => {
		if (!acceptedMimeTypes.includes(file.mimetype)) {
			cb(
				new AppError(
					"Accepted file types are: " + acceptedMimeTypes.join(", "),
					400
				),
				false
			);
		} else {
			cb(null, true);
		}
	};

	const ONE_MB = 1 * 1024 ** 2;
	const limits = { fileSize: maxFileSize * ONE_MB };

	return multer({ storage, fileFilter, limits });
};
