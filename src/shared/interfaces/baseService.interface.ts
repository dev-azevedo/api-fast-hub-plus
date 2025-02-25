interface IBaseService<T, C = T, U = T, R = T> {
  findAll(): Promise<R[]>;
  findById(id: string): Promise<R>;
  create(item: C): Promise<R>;
  update(item: U): Promise<R>;
  deactive(id: string): Promise<void>;
}

export default IBaseService