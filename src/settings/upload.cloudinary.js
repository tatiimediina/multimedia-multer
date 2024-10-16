// permite interactuar con su API para gestionar archivos en la nube.
import { v2 as cloudinary } from "cloudinary";

//almacenar archivos en Cloudinary utilizando Multer.
import { CloudinaryStorage } from "multer-storage-cloudinary";

// genera identificadores únicos (UUIDs).
import crypto from "node:crypto";

// configura Cloudinary con las credenciales almacenadas en las variables de entorno.
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Define el almacenamiento usando CloudinaryStorage, para que Multer guarde los archivos en Cloudinary.
export const storage = new CloudinaryStorage({
  cloudinary,

  // Define los parámetros para la carga del archivo.
  params: async (_req, file) => {
    return {
      folder: "uploads", // Carpeta donde se almacenarán los archivos
      format: "webp", // Convierte los archivos subidos al formato webp
      public_id: `${file.fieldname}-${crypto.randomUUID()}`, // Genera un nombre único para cada archivo usando el nombre del campo y un UUID.

      // Aplica transformaciones a la imagen antes de guardarla.
      transformation: [
        {
          width: 128,
          height: 128,
          crop: "fill", // Recorta la imagen para ajustarse exactamente a las dimensiones especificadas.
        },
      ],
    };
  },
});
