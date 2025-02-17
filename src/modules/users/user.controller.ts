import { Request, Response } from "express";
import UserService from "./user.service.js";
import httpStatus from "http-status";

import { CreateUserDto } from "./dtos/createUser.dto.js";
import { UpdateUserDto } from "./dtos/updateUser.dto.js";

class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }


  public findAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const users = await this.userService.findAll();
      res.status(httpStatus.OK).json(users);

    } catch (error) {
      if (error instanceof Error) {
        res.status(httpStatus.BAD_REQUEST).json({ message: error.message });
        return;
      }

      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal server error" });
    }
  }

  public findById = async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;

    try {
      const user = await this.userService.findById(id);
      res.status(httpStatus.OK).json(user);
    } catch (error) {
      if (error instanceof Error) {
        res.status(httpStatus.BAD_REQUEST).json({ message: error.message });
        return;
      }

      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal server error" });
    }
  }

  public create = async (req: Request, res: Response): Promise<void> => {
    const user: CreateUserDto = req.body;

    try {
      const userCreated = await this.userService.createUser(user);
      res.status(httpStatus.CREATED).json(userCreated);
    } catch (error) {
      if (error instanceof Error) {
        res.status(httpStatus.BAD_REQUEST).json({ message: error.message });
        return;
      }

      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal server error" });
    }
  }

  public update = async (req: Request, res: Response): Promise<void> => {
    const user: UpdateUserDto = req.body;

    try {
      const userUpdated = await this.userService.updateUser(user);
      res.status(httpStatus.OK).json(userUpdated);
    } catch (error) {
      if (error instanceof Error) {
        res.status(httpStatus.BAD_REQUEST).json({ message: error.message });
        return;
      }

      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal server error" });
    }
  }
}

export default UserController;
