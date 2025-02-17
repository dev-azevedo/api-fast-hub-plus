import { IsEmail, IsEnum, IsOptional, IsString, IsUUID, Length } from "class-validator";

import { ETypeUser } from "@prisma/client";

export class UpdateUserDto {
    @IsUUID()
    id!: string;

    @IsString()
    @Length(3, 255)
    name!: string;

    @IsEmail()
    email!: string;
 
    @IsEnum(ETypeUser)
    role!: ETypeUser;
    
    active: boolean = true;
}
