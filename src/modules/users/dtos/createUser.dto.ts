import { ETypeUser } from "@prisma/client";
import { IsEmail, IsEnum, IsString, Length } from "class-validator";

export class CreateUserDto {
  @IsString()
  @Length(3, 255)
  name!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @Length(8, 255)
  password!: string;

  @IsEnum(ETypeUser)
  role!: ETypeUser;
}