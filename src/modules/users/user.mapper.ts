import { User } from "@prisma/client";
import { ResponseUserDto } from "./dtos/responseUser.dto.js";
import { UpdateUserDto } from "./dtos/updateUser.dto.js";

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

  public static mapUpdateUserDtoToUser = (
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
}

export default UserMapper;