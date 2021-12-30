import { DeepPartial, DeleteResult, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
export declare abstract class GenericService<T> {
    private repository;
    constructor(repository: Repository<T>);
    findAll(): Promise<T[]>;
    findOneById(id: string): Promise<T>;
    create(data: DeepPartial<T>): Promise<T>;
    delete(id: string): Promise<DeleteResult>;
    update(id: string, data: QueryDeepPartialEntity<T>): Promise<T>;
}
