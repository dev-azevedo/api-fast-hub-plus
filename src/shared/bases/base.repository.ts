import { Prisma, PrismaClient } from "@prisma/client";
import IBaseRepository from "../interfaces/baseRepository.interface.js";

abstract class BaseRepository<T> implements IBaseRepository<T> {
  private readonly _model: any;

  constructor(model: any) {
    this._model = model;
  }

  public findAll = async (): Promise<T[]> => {
    return await this._model.findMany({ where: { active: true } });
  };
  public findById = async (id: string): Promise<T | null> => {
    return await this._model.findUnique({ where: { id, active: true } });
  }

  public abstract create(...args: any[]): Promise<T>;
  public abstract update(...args: any[]): Promise<T>;

  public deactive = async (id: string): Promise<void> => {
    await this._model.update({
      where: { id: id },
      data: { active: false },
    });
  }
}

export default BaseRepository;