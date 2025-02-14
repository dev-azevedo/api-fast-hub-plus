import { PrismaClient, User } from "@prisma/client";
import { CreateUserDto } from "./dtos/createUser.dto.js";
import { UpdateUserDto } from "./dtos/updateUser.dto.js";

class UserRepository {
    private readonly prisma: PrismaClient;
    constructor() {
        this.prisma = new PrismaClient();
    }

    async createUser(user: CreateUserDto): Promise<User> {
        return await this.prisma.user.create({
            data: user,
        });
    }

    async findAll(): Promise<User[]> {
        return await this.prisma.user.findMany();
    }

    async findById(id: string): Promise<User | null> {
        return await this.prisma.user.findUnique({
            where: { id }
        });
    }

    async updateUser(user: UpdateUserDto): Promise<User> {
        return await this.prisma.user.update({
            where: { id: user.id },
            data: user,
        });
    }


    async deleteUser(id: string): Promise<void> {
        await this.prisma.user.delete({
            where: { id }
        });
    }
}

export default UserRepository;