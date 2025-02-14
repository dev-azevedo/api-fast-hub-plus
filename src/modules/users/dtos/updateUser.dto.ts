import { CreateUserDto } from "./createUser.dto.js";

export interface UpdateUserDto extends CreateUserDto {
    id: string;
}
