import { Request, Response } from "express";
import UserService from "./user.service.js";
import httpStatus from "http-status";

import { CreateUserDto } from "./dtos/createUser.dto.js";
import { UpdateUserDto } from "./dtos/updateUser.dto.js";
import { SignInUserDto } from "./dtos/signInUser.dto.js";
import ErrorHandler from "./../../shared/errors/ErrorHandler.js";

class UserController {
  private readonly _service: UserService;

  constructor() {
    this._service = new UserService();
  }

  public signIn = async (req: Request, res: Response): Promise<void> => {
    const user: SignInUserDto = req.body;

    try {
      const userSignedIn = await this._service.signIn(user);
      res.status(httpStatus.OK).json(userSignedIn);
    } catch (error) {
        ErrorHandler.handleError(res, error);
    }
  };

  public findAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const users = await this._service.findAll();
      res.status(httpStatus.OK).json(users);
    } catch (error) {
      ErrorHandler.handleError(res, error);
    }
  };

  public findById = async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;

    try {
      const user = await this._service.findById(id);
      res.status(httpStatus.OK).json(user);
    } catch (error) {
      ErrorHandler.handleError(res, error);
    }
  };

  public create = async (req: Request, res: Response): Promise<void> => {
    const user: CreateUserDto = req.body;

    try {
      const userCreated = await this._service.create(user);
      res.status(httpStatus.CREATED).json(userCreated);
    } 
    catch (error) {
      ErrorHandler.handleError(res, error);
    }
  };

  public update = async (req: Request, res: Response): Promise<void> => {
    const user: UpdateUserDto = req.body;

    try {
      const userUpdated = await this._service.update(user);
      res.status(httpStatus.OK).json(userUpdated);
    } catch (error) {
      ErrorHandler.handleError(res, error);
    }
  };

  public deactive = async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;

    try {
      await this._service.deactive(id);
      res.status(httpStatus.NO_CONTENT).json();
    } catch (error) {
      ErrorHandler.handleError(res, error);
    }
  };
}

export default UserController;
