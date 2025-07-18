import { FileUploadPlugin } from "../config/plugins/file-uploads.plugin";

const upload = new FileUploadPlugin("public/uploads/images/users").initialize();

export default upload;
