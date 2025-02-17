import { User } from "@prisma/client";
import { CreateUserDto } from "./dtos/createUser.dto.js";
import UserRepository from "./user.repository.js";
import { UpdateUserDto } from "./dtos/updateUser.dto.js";
import { ResponseUserDto } from "./dtos/responseUser.dto.js";
import * as bcrypt from "bcrypt";
import { SignInUserDto } from "./dtos/signInUser.dto.js";
import Jwt from "../../shared/utils/jwt.service.js";

class UserService {
  private readonly userRepository: UserRepository;
  private readonly jwt: Jwt;

  constructor() {
    this.userRepository = new UserRepository();
    this.jwt = new Jwt();
  }

  public signIn = async (user: SignInUserDto): Promise<ResponseUserDto> => {
    const userOnDb = await this.userRepository.findByEmail(user.email);

    if (!userOnDb) throw new Error("Email or password invalid");

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

    const userResponse = this._mapUserToResponse(userOnDb);
    userResponse.token = token;

    return userResponse;
  };

  public createUser = async (user: CreateUserDto): Promise<ResponseUserDto> => {
    const { confirmPassword, ...userData } = user;
    userData.password = await this._hashPassword(userData.password);

    const userCreated = await this.userRepository.createUser(userData);
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
  };

  public deactiveUser = async (id: string): Promise<void> => {
    const userOnDb = await this.findById(id) as User;

    if (!userOnDb)
      throw new Error("User not found");

    await this.userRepository.deactiveUser(userOnDb.id);
  };

  private _mapUserToResponse = (user: User): ResponseUserDto => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    };
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