import { ETypeUser } from "@prisma/client";
import { IsEmail, IsEnum, IsString, Length, Matches, Validate, ValidateIf, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint({ name: "MatchPasswords", async: false })
export class MatchPasswords implements ValidatorConstraintInterface {
  validate(confirmPassword: string, args: ValidationArguments) {
    const object = args.object as any;
    return object.password === confirmPassword;
  }

  defaultMessage(args: ValidationArguments) {
    return "Passwords do not match";
  }
}



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
  @Validate(MatchPasswords)
  confirmPassword!: string;

  @IsEnum(ETypeUser)
  role!: ETypeUser;
}




