import { PrismaClient, User } from "@prisma/client";

class UserRepository {
  private readonly prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }

  async createUser(
    user: Omit<User, "id" | "createdAt" | "updatedAt">): Promise<User> {
    return await this.prisma.user.create({
      data: user,
    });
  }

  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async findById(id: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { id },
    });
  }

  async updateUser(user: Omit<User, "createdAt" | "updatedAt">): Promise<User> {
    return await this.prisma.user.update({
      where: { id: user.id },
      data: user,
    });
  }

  async deleteUser(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }
}

export default UserRepository;