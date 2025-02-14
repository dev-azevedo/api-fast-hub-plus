import { Router, Request, Response } from "express";
import UserController from "./user.controller.js";



const userRoutes = Router();
const userController = new UserController();

userRoutes.post("/user", userController.create);

export default userRoutes;

