import multer from "multer";
import { storage } from "../settings/upload.cloudinary.js";

export const upload = multer({ storage });
