import { Request, Response } from "express";
import UserService from "./user.service.js";
import httpStatus from "http-status";

import { CreateUserDto } from "./dtos/createUser.dto.js";
import { UpdateUserDto } from "./dtos/updateUser.dto.js";
import { SignInUserDto } from "./dtos/signInUser.dto.js";
import ErrorHandler from "shared/errors/ErrorHandler.js";

class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public signIn = async (req: Request, res: Response): Promise<void> => {
    const user: SignInUserDto = req.body;

    try {
      const userSignedIn = await this.userService.signIn(user);
      res.status(httpStatus.OK).json(userSignedIn);
    } catch (error) {
        ErrorHandler.handleError(res, error);
    }
  };

  public findAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const users = await this.userService.findAll();
      res.status(httpStatus.OK).json(users);
    } catch (error) {
      ErrorHandler.handleError(res, error);
    }
  };

  public findById = async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;

    try {
      const user = await this.userService.findById(id);
      res.status(httpStatus.OK).json(user);
    } catch (error) {
      ErrorHandler.handleError(res, error);
    }
  };

  public create = async (req: Request, res: Response): Promise<void> => {
    const user: CreateUserDto = req.body;

    try {
      const userCreated = await this.userService.createUser(user);
      res.status(httpStatus.CREATED).json(userCreated);
    } 
    catch (error) {
      ErrorHandler.handleError(res, error);
    }
  };

  public update = async (req: Request, res: Response): Promise<void> => {
    const user: UpdateUserDto = req.body;

    try {
      const userUpdated = await this.userService.updateUser(user);
      res.status(httpStatus.OK).json(userUpdated);
    } catch (error) {
      ErrorHandler.handleError(res, error);
    }
  };

  public deactive = async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;

    try {
      await this.userService.deactiveUser(id);
      res.status(httpStatus.NO_CONTENT).json({ message: "User deleted" });
    } catch (error) {
      ErrorHandler.handleError(res, error);
    }
  };
}

export default UserController;
