import { PrismaClient, User } from "@prisma/client";

class UserRepository {
  private readonly _prisma: PrismaClient;
  constructor() {
    this._prisma = new PrismaClient();
  }

  public findAll = async (): Promise<User[]> => {
    return await this._prisma.user.findMany({ where: { active: true } });
  };

  public findById = async (id: string): Promise<User | null> => {
    return await this._prisma.user.findUnique({
      where: {
        id,
        active: true,
      },
    });
  };

  public findByEmail = async (email: string): Promise<User | null> => {
    return await this._prisma.user.findUnique({
      where: { email },
    });
  };

  public create = async (user: User): Promise<User> => {
    return await this._prisma.user.create({
      data: user,
    });
  };

  public update = async (user: User): Promise<User> => {
    return await this._prisma.user.update({
      where: { id: user.id },
      data: user,
    });
  };

  public deactive = async (id: string): Promise<void> => {
    await this._prisma.user.update({
      where: { id: id },
      data: { active: false },
    });
  };
}

export default UserRepository;