import { IsUUID } from "class-validator";
import { CreateUserDto } from "./createUser.dto.js";

export class UpdateUserDto extends CreateUserDto {
    @IsUUID()
    id!: string;
}
