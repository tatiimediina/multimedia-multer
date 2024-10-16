import { Router } from "express";
import { uploadImage } from "../middlewares/upload.multer.middleware.js";

const productsRouter = Router();

//para un solo archivo con single(), y para muchos array()

productsRouter.post("/multer", uploadImage, (req, res) => {
  res.status(201).json({
    image: "http://localhost.4000/products/" + req.body.image,
  });
});

productsRouter.post("/cloudinary", uploadImage, (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No se ha subido ningún archivo" });
  }

  // acceder a la URL del archivo subido en Cloudinary
  const fileUrl = req.file.path;

  res.status(200).json({
    message: "Archivo subido exitosamente",
    fileUrl,
  });
});

export { productsRouter };
