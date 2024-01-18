// products.view.js
import { Router } from "express";

const productsRouter = Router();

productsRouter.get("/", (req, res, next) => {
  try {
    // Lógica para manejar la solicitud de productos
    return res.render("products/index"); // Reemplaza con la lógica real
  } catch (error) {
    next(error);
  }
});

// Otras rutas de productos, si es necesario
productsRouter.get("/details", (req, res, next) => {
  try {
    // Lógica para manejar la solicitud de detalles de producto
    return res.render("products/details"); // Reemplaza con la lógica real
  } catch (error) {
    next(error);
  }
});

export default productsRouter;
