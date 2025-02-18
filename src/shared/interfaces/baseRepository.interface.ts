interface IBaseRepository<T> {
    findAll(): Promise<T[]>
    findById(id: string): Promise<T | null>
    create(...args: any[]): Promise<T>
    update(...args: any[]): Promise<T>
    deactive(id: string): Promise<void>
}

export default IBaseRepository;