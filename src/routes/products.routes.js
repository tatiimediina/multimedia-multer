import { Router } from "express";
import { uploadImage } from "../middlewares/upload.middleware.js";

const productsRouter = Router();

//para uno solo single(), para muchos array()

productsRouter.post("/", uploadImage, (req, res) => {
  res.status(201).json({
    image: "http://localhost.4000/products/" + req.body.image,
  });
});

export { productsRouter };
