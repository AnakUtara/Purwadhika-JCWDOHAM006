import sharp from "sharp";
class ProcessorService {
    async compressImage(file, shrinkLevel) {
        const { mimetype, buffer } = file;
        const ext = mimetype.split("/")[1];
        return await sharp(buffer)
            .rotate()
            .toFormat(ext, {
            quality: (() => {
                switch (shrinkLevel) {
                    case "low":
                        return 80;
                    case "medium":
                        return 60;
                    case "high":
                        return 40;
                    default:
                        return 80;
                }
            })(),
        })
            .toBuffer();
    }
    changeFilename(originalName, suffix) {
        const ext = originalName.lastIndexOf(".") !== -1
            ? originalName.slice(originalName.lastIndexOf("."))
            : "";
        const base = originalName.lastIndexOf(".") !== -1
            ? originalName.slice(0, originalName.lastIndexOf("."))
            : originalName;
        return `${base}${suffix}${ext}`;
    }
}
export default ProcessorService;
