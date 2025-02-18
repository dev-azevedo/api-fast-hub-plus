import { PrismaClient, User } from "@prisma/client";
import BaseRepository from "../../shared/bases/base.repository.js";

class UserRepository extends BaseRepository<User> {
  constructor() {
    const prisma = new PrismaClient();
    super(prisma.user);
  }


  public findByEmail = async (email: string): Promise<User | null> => {
    return await this._model.user.findUnique({
      where: { email },
    });
  };

  public create = async (user: User): Promise<User> => {
    return await this._model.user.create({
      data: user,
    });
  };

  public update = async (user: User): Promise<User> => {
    return await this._model.user.update({
      where: { id: user.id },
      data: user,
    });
  };
}

export default UserRepository;