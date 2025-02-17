import { User } from "@prisma/client";
import { CreateUserDto } from "./dtos/createUser.dto.js";
import UserRepository from "./user.repository.js";
import { UpdateUserDto } from "./dtos/updateUser.dto.js";
import { ResponseUserDto } from "./dtos/responseUser.dto.js";

class UserService {
  private readonly userRepository: UserRepository;
  private readonly userResponse: ResponseUserDto;

  constructor() {
    this.userRepository = new UserRepository();
    this.userResponse = new ResponseUserDto();
  }

  public createUser = async (user: CreateUserDto): Promise<ResponseUserDto> => {
    const userCreated = await this.userRepository.createUser(user);
    return this._mapUserToResponse(userCreated);
  };

  public findAll = async (): Promise<ResponseUserDto[]> => {
    const users = await this.userRepository.findAll();
    return users.map((user) => this._mapUserToResponse(user));
  };

  public findById = async (id: string): Promise<ResponseUserDto> => {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error("User not found");
    }

    return this._mapUserToResponse(user);
  };

  public updateUser = async (user: UpdateUserDto): Promise<ResponseUserDto> => {
    const userOnDb = await this.findById(user.id);

     if (!userOnDb) {
       throw new Error("User not found");
     }

    const userUpdate = await this.userRepository.updateUser(user);

    return this._mapUserToResponse(userUpdate);
  }

  async deleteUser(id: string): Promise<void> {
    const userOnDb = await this.findById(id);

    if (!userOnDb) {
      throw new Error("User not found");
    }
    await this.userRepository.deleteUser(id);
  }

  private _mapUserToResponse = (user: User): ResponseUserDto => {
     return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    };
  };
}

export default UserService;