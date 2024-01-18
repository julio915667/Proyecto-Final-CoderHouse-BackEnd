// index.view.js
import { Router } from "express";
import usersRouter from "./users.view.js";
import productsRouter from "./products.view.js";

const viewsRouter = Router();

viewsRouter.get("/", (req, res, next) => {
  try {
    // No hay necesidad de eventos específicos aquí si no los estás utilizando
    const date = new Date();
    return res.render("index", { date });
  } catch (error) {
    next(error);
  }
});

// Usar las rutas específicas
viewsRouter.use("/products", productsRouter);
viewsRouter.use("/users", usersRouter);

export default viewsRouter;
