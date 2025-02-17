import { Router, Request, Response } from "express";

import UserController from "./user.controller.js";
import {
  validateCreateUserDto,
  validateSignInUserDto,
  validateUpdateUserDto,
} from "./user.validation.js";



const userRoutes = Router();
const userController = new UserController();

userRoutes.get("/users", userController.findAll);
userRoutes.get("/users/:id", userController.findById);
userRoutes.post("/users", validateCreateUserDto, userController.create);
userRoutes.put("/users", validateUpdateUserDto, userController.update);
userRoutes.delete("/users/:id", userController.delete);
userRoutes.post("/signin/", validateSignInUserDto, userController.signIn);

export default userRoutes;

