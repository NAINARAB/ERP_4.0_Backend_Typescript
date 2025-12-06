import multer from "multer";
import path from "path";
import { imageFolder } from "./createUploadFolders";

const storage = (folder: string) => {
    return multer.diskStorage({
        destination: function (_req, _file, cb) {
            cb(null, imageFolder[folder]);
        },
        filename: function (_req, file, cb) {
            const ext = path.extname(file.originalname);
            const base = path.basename(file.originalname, ext).replace(/\s+/g, "_");
            const name = `${Date.now()}-${base}${ext}`;
            cb(null, name);
        }
    })
};

function fileFilter(_req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) {
    if (!file.mimetype.startsWith("image/")) {
        return cb(new Error("Only image files are allowed"));
    }
    cb(null, true);
}

export const uploadImage = (folder: string) => multer({
    storage: storage(folder),
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
}).single("image"); 
