import IBaseRepository from "shared/interfaces/baseRepository.interface.js";
import IBaseService from "../interfaces/baseService.interface.js";
import IBaseMapper from "../interfaces/baseMapper.interface.js";

abstract class BaseService<T, C = T, U = T, R = T> implements IBaseService<T, C, U, R> {
  private readonly _repository: IBaseRepository<T>;
  private readonly _mapper: IBaseMapper<T, C, U, R>;

  constructor(repository: IBaseRepository<T>, mapper: IBaseMapper<T, C, U, R>) {
    this._repository = repository;
    this._mapper = mapper;
  }

  public findAll = async (): Promise<R[]> => {
    const itemsOnDb = (await this._repository.findAll()) as T[];
    return this._mapper.mapItemsToResponses(itemsOnDb);
  };

  public findById = async (id: string): Promise<R> => {
    const itemOnDb = (await this._repository.findById(id)) as T;

    if (!itemOnDb) throw new Error("Item not found");

    return this._mapper.mapItemToResponse(itemOnDb);
  };

  public abstract create(item: C): Promise<R>;
  public abstract update(item: U): Promise<R>;

  public deactive(id: string): Promise<void> {
    const itemOnDb = this._repository.findById(id) as T;

    if (!itemOnDb) throw new Error("Item not found");

    return this._repository.deactive(id);
  }
}

export default BaseService;