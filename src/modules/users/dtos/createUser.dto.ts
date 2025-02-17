import { ETypeUser } from "@prisma/client";
import { IsEmail, IsEnum, IsString, Length, Validate, ValidateIf, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

export class CreateUserDto {
  @IsString()
  @Length(3, 255)
  name!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @Length(8, 255)
  password!: string;

  @IsString()
  @Length(8, 255)
  confirmPassword!: string;

  @IsEnum(ETypeUser)
  role!: ETypeUser;

  active: boolean = true;
}




