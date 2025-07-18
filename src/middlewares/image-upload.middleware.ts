import multer from "multer";
import path from "path";
import fs from "fs";
import { generateUUID } from "../config/plugins/uuid.plugin";

const uploadDir = path.join(
  __dirname,
  "..",
  "..",
  "public",
  "uploads",
  "images",
  "users"
);

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = generateUUID();
    const fileExtension = path.extname(file.originalname);
    const fileName = `${path.basename(
      file.originalname,
      fileExtension
    )}-${uniqueSuffix}${fileExtension}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage });

export default upload;
