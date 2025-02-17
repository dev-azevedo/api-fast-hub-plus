import { Router } from "express";

import UserController from "./user.controller.js";
import {
  validateCreateUserDto,
  validateSignInUserDto,
  validateUpdateUserDto,
} from "./user.validation.js";
import { authUser } from "./../../shared/middlewares/auth.middleware.js";



const userRoutes = Router();
const userController = new UserController();

userRoutes.get("/users", authUser, userController.findAll);
userRoutes.get("/users/:id", authUser, userController.findById);
userRoutes.post(
  "/users",
  authUser,
  validateCreateUserDto,
  userController.create
);
userRoutes.put(
  "/users",
  authUser,
  validateUpdateUserDto,
  userController.update
);
userRoutes.delete("/users/:id", authUser, userController.delete);
userRoutes.post(
  "/signin/",
  validateSignInUserDto,
  userController.signIn
);

export default userRoutes;

