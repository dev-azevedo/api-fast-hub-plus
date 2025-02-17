import { Router, Request, Response } from "express";
import UserController from "./user.controller.js";
import { validateCreateUserDto } from "./user.validation.js";



const userRoutes = Router();
const userController = new UserController();

userRoutes.post("/users", validateCreateUserDto, userController.create);
userRoutes.get("/users", userController.findAll);
userRoutes.get("/users/:id", userController.findById);

export default userRoutes;

