import { HttpStatus } from '@nestjs/common';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { GenericService } from '../service';
export declare abstract class AbstractCRUDController<DTO, Entity, Service extends GenericService<Entity>> {
    private service;
    private readonly entityName;
    constructor(service: Service, entityName: any);
    findAll(): Promise<Entity[]>;
    findOneById(id: string): Promise<Entity>;
    update(id: string, data: QueryDeepPartialEntity<Entity>): Promise<Entity>;
    create(data: DTO): Promise<Entity>;
    delete(id: string): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
}
