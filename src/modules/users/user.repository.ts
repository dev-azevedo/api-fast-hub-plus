import { PrismaClient, User } from "@prisma/client";

class UserRepository {
  private readonly prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }

  public createUser = async (
    user: Omit<User, "id" | "createdAt" | "updatedAt">
  ): Promise<User> => {
    return await this.prisma.user.create({
      data: user,
    });
  };

  public findAll = async (): Promise<User[]> => {
    return await this.prisma.user.findMany({where: {active: true}});
  };

  public findById = async (id: string): Promise<User | null> => {
    const userOnDb = await this.prisma.user.findUnique({
      where: { 
        id,
        active: true
       },
    });

    if (userOnDb) {
      return userOnDb;
    }

    return null;
  };

  public findByEmail = async (email: string): Promise<User | null> => {
    const userOnDb = await this.prisma.user.findUnique({
      where: { email },
    });

    
    if (userOnDb) {
      return userOnDb;
    }

    return null;
  };

  public updateUser = async (
    user: User
  ): Promise<User> => {
    return await this.prisma.user.update({
      where: { id: user.id },
      data: user,
    });
  };

  public deactiveUser = async (id: string): Promise<void> => {
    await this.prisma.user.update({
      where: { id: id },
      data: { active: false },
    });
  };
}

export default UserRepository;