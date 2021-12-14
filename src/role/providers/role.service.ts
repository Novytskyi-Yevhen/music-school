import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { GenericService } from "src/shared/service";
import { Role } from "src/shared/entity";
import { Repository } from "typeorm";

@Injectable()
export class RoleService extends GenericService<Role>{
    constructor(
        @InjectRepository(Role) private rolesRepository: Repository<Role>,
      ) {
        super(rolesRepository)
      }
      async findOneByName(name: string) {
        return await this.rolesRepository.findOne({name});
      }
}