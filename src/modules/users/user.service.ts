import { User } from "@prisma/client";
import { CreateUserDto } from "./dtos/createUser.dto.js";
import UserRepository from "./user.repository.js";
import { UpdateUserDto } from "./dtos/updateUser.dto.js";

class UserService {
    private readonly userRepository: UserRepository;
    constructor() {
        this.userRepository = new UserRepository();
    }

    async createUser(user: CreateUserDto): Promise<User> {
        return await this.userRepository.createUser(user);
    }

    async findAll(): Promise<User[]> {
        return await this.userRepository.findAll();
    }

    async findById(id: string): Promise<User> {
        const user = await this.userRepository.findById(id);

        if (!user) {
            throw new Error("User not found");
        }

        return user;
    }

    async updateUser(user: UpdateUserDto): Promise<User> {
        const userDb = await this.findById(user.id);

        const userUpdate = await this.userRepository.updateUser(user);

        return userUpdate;
    }

    async deleteUser(id: string) : Promise<void> {
        const user = await this.findById(id);
        await this.userRepository.deleteUser(id);
    }
}

export default UserService;