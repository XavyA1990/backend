import multer from "multer";
import path from "path";
import fs from "fs";
import { generateUUID } from "./uuid.plugin";

export class FileUploadPlugin {
  private uploadDir: string;

  constructor(dir: string) {
    this.uploadDir = path.join(__dirname, "..", "..", "..", dir);
  }

  public initialize() {
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }

    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, this.uploadDir);
      },
      filename: (req, file, cb) => {
        const uniqueSuffix = generateUUID();
        const fileExtension = path.extname(file.originalname);
        const sanitizedBaseName = path
          .basename(file.originalname, fileExtension)
          .replace(/\s+/g, "_")
          .toLowerCase();
        const fileName = `${sanitizedBaseName}-${uniqueSuffix}${fileExtension}`;
        cb(null, fileName);
      },
    });

    return multer({ storage });
  }

  public removeFile() {
    if (fs.existsSync(this.uploadDir)) {
      fs.rmSync(this.uploadDir, { recursive: true });
    }
  }
}
