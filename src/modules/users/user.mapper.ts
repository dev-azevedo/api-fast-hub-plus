import { User } from "@prisma/client";
import { v4 as uuid } from 'uuid';

import { ResponseUserDto } from "./dtos/responseUser.dto.js";
import { UpdateUserDto } from "./dtos/updateUser.dto.js";
import { CreateUserDto } from "./dtos/createUser.dto.js";


class UserMapper {
  public mapUserToResponse = (user: User): ResponseUserDto => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    } as ResponseUserDto;
  };

  public mapUsersToResponse = (users: User[]): ResponseUserDto[] => {
    return users.map((user: User) => this.mapUserToResponse(user)) as ResponseUserDto[];
  };

  public mapUpdateUserDtoToUser = (
    userUpdate: UpdateUserDto,
    userOnDb: User
  ): User => {
    return {
      id: userUpdate.id,
      name: userUpdate.name,
      email: userUpdate.email,
      role: userUpdate.role,
      active: userUpdate.active,
      createdAt: userOnDb.createdAt,
      updatedAt: userOnDb.updatedAt,
    } as User;
  };

  public mapCreateUserDtoToUser = (userCreated: CreateUserDto): User =>  {
    return {
        id: uuid(),
        name: userCreated.name,
        email: userCreated.email,
        password: userCreated.password,
        role: userCreated.role,
        active: userCreated.active,
        createdAt: new Date(),
        updatedAt: new Date(),
    }
  }
}

export default UserMapper;