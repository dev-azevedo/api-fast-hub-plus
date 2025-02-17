import { User } from "@prisma/client";
import { CreateUserDto } from "./dtos/createUser.dto.js";
import UserRepository from "./user.repository.js";
import { UpdateUserDto } from "./dtos/updateUser.dto.js";
import { ResponseUserDto } from "./dtos/responseUser.dto.js";
import * as bcrypt from "bcrypt";
import { SignInUserDto } from "./dtos/signInUser.dto.js";
import Jwt from "../../shared/utils/jwt.service.js";
import UserMapper from "./user.mapper.js";

class UserService {
  private readonly _repository: UserRepository;
  private readonly _mapper: UserMapper;
  private readonly jwt: Jwt;

  constructor() {
    this._repository = new UserRepository();
    this._mapper = new UserMapper()
    this.jwt = new Jwt();
  }

  public signIn = async (user: SignInUserDto): Promise<ResponseUserDto> => {
    const userOnDb = await this._repository.findByEmail(user.email);

    if (!userOnDb || !userOnDb.active) throw new Error("Email or password invalid");

    const isPasswordCorrect = await this._validatePassword(
      user.password,
      userOnDb.password
    );

    if (!isPasswordCorrect) throw new Error("Email or password invalid");

    const token = this.jwt.generateToken({
      id: userOnDb.id,
      name: userOnDb.name,
      email: userOnDb.email,
      role: userOnDb.role,
    });

    const userResponse = this._mapper.mapUserToResponse(userOnDb);
    userResponse.token = token;

    return userResponse;
  };

  public createUser = async (user: CreateUserDto): Promise<ResponseUserDto> => {
    const { confirmPassword, ...userData } = user;
    
    const useronDb = await this._repository.findByEmail(user.email);
    
    if (useronDb) {
      throw new Error("Email already exists");
    }
    
    const userFormatted = await this._mapper.mapCreateUserDtoToUser(user);

    userFormatted.password = await this._hashPassword(userFormatted.password);

    const userCreated = await this._repository.createUser(userFormatted);
    return this._mapper.mapUserToResponse(userCreated);
  };

  public findAll = async (): Promise<ResponseUserDto[]> => {
    const users = await this._repository.findAll();

    return this._mapper.mapUsersToResponse(users);
  };

  public findById = async (id: string): Promise<ResponseUserDto> => {
    const userOnDb = await this._repository.findById(id);

    if (!userOnDb) {
      throw new Error("User not found");
    }

    return this._mapper.mapUserToResponse(userOnDb);
  };

  public updateUser = async (user: UpdateUserDto): Promise<ResponseUserDto> => {
    const userOnDb = await this.findById(user.id) as User;

    if (!userOnDb)
      throw new Error("User not found");

    userOnDb.name = user.name;
    userOnDb.email = user.email;
    userOnDb.role = user.role;

    const userUpdate = await this._repository.updateUser(userOnDb);

    return this._mapper.mapUserToResponse(userUpdate);
  };

  public deactiveUser = async (id: string): Promise<void> => {
    const userOnDb = await this.findById(id) as User;

    if (!userOnDb)
      throw new Error("User not found");

    await this._repository.deactiveUser(userOnDb.id);
  };

  private _hashPassword = (password: string): Promise<string> => {
    return bcrypt.hash(password, 10);
  };

  private _validatePassword = async (
    userPassword: string,
    passowordOnDb: string
  ): Promise<boolean> => {
    return await bcrypt.compare(userPassword, passowordOnDb);
  };
}

export default UserService;