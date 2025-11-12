import multer from "multer";
import path from "path";


const uploadsRoot = path.resolve(process.cwd(), "uploads");
const productsDir = path.join(uploadsRoot, "products");
console.log(`Current directory: ${process.cwd()}`);

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, productsDir);
  },
  filename: function (_req, file, cb) {
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext).replace(/\s+/g, "_");
    const name = `${Date.now()}-${base}${ext}`;
    cb(null, name);
  }
});

function fileFilter(_req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) {
  if (!file.mimetype.startsWith("image/")) {
    return cb(new Error("Only image files are allowed"));
  }
  cb(null, true);
}

export const uploadProductImage = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024
  }
}).single("image"); 
