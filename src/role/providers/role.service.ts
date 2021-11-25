import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Role } from "src/shared/entity";
import { Repository } from "typeorm";
import { RoleDTO } from "../dto";

@Injectable()
export class RoleService{
    constructor(
        @InjectRepository(Role) private rolesRepository: Repository<Role>,
      ) {}
      async findAll(): Promise<Role[]> {
        return await this.rolesRepository.find();
      }
      async findOneByName(name: string) {
        return await this.rolesRepository.findOne({name});
      }
      async findOneById(id: number) {
        return await this.rolesRepository.findOne({id});
      }
      async create(data: RoleDTO) {
        const newRole = this.rolesRepository.create(data);
        await this.rolesRepository.save(newRole);
        return newRole;
      }
      async delete(id: number){
          return await this.rolesRepository.delete({id: id});
      }
      async update(id: number, data: Partial<RoleDTO>){
          await this.rolesRepository.update({id}, data);
          return await this.rolesRepository.findOne({id});
      }
}