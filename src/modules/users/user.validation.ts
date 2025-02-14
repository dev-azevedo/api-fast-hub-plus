import { validate } from "class-validator";
import { CreateUserDto } from "./dtos/createUser.dto.js";
import { plainToClass } from "class-transformer";

class UserValidation {
  async createUser(userData: ReadableStream<any> | null): Promise<CreateUserDto> {
    const user = plainToClass(CreateUserDto, userData);

    const errors = await validate(user);

    if (errors.length > 0) {
      throw new Error("User invalid");
    }

    return user;
  }
}

export default UserValidation;