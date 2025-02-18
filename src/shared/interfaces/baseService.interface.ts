interface IBaseService<T> {
    findAll(): Promise<T>;
    findById(id: string): Promise<T>;
    create(item: T): Promise<T>;
    update(item: T): Promise<T>;
    deactive(id: string): Promise<void>;
}

export default IBaseService