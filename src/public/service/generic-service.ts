import { Injectable } from '@nestjs/common';
import { DeepPartial, DeleteResult, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export abstract class GenericService<T> {
  constructor(private repository: Repository<T>) {}
  async findAll(): Promise<T[]> {
    return await this.repository.find();
  }
  async findOneById(id: number): Promise<T> {
    return await this.repository.findOne(id);
  }
  async create(data: DeepPartial<T>): Promise<T> {
    const newObject = this.repository.create(data);
    await this.repository.save(newObject);
    return newObject;
  }
  async delete(id: number): Promise<DeleteResult> {
    return await this.repository.delete(id);
  }
  async update(id: number, data: QueryDeepPartialEntity<T>) {
    await this.repository.update(id, data);
    return await this.repository.findOne(id);
  }
}
