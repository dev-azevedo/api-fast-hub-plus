import { Request, Response } from "express";
import { CreateUserDto } from "./dtos/createUser.dto.js";
import UserService from "./user.service.js";
import UserValidation from "./user.validation.js";
import httpStatus from "http-status";

class UserController {
  private readonly userService: UserService;
  private readonly userValidation: UserValidation;

  constructor() {
    this.userService = new UserService();
    this.userValidation = new UserValidation();
  }

  async create(req: Request, res: Response): Promise<void> {
    const userData = req.body;

    try {
      const user: CreateUserDto = await this.userValidation.createUser(
        userData
      );

      if (!user) {
        res.status(httpStatus.NOT_FOUND).json({ message: "User not found" });
        return;
      }

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
}

export default UserController;
