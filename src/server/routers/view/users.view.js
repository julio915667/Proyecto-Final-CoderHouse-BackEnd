// users.view.js
import { Router } from "express";

const usersRouter = Router();

usersRouter.get("/", (req, res, next) => {
  try {
    // Lógica para manejar la solicitud de usuarios
    return res.render("users/index"); // Reemplaza con la lógica real
  } catch (error) {
    next(error);
  }
});

// Otras rutas de usuarios, si es necesario
usersRouter.get("/profile", (req, res, next) => {
  try {
    // Lógica para manejar la solicitud del perfil de usuario
    return res.render("users/profile"); // Reemplaza con la lógica real
  } catch (error) {
    next(error);
  }
});

export default usersRouter;
