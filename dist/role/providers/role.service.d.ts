import { GenericService } from "src/shared/service";
import { Role } from "src/shared/entity";
import { Repository } from "typeorm";
export declare class RoleService extends GenericService<Role> {
    private rolesRepository;
    constructor(rolesRepository: Repository<Role>);
    findOneByName(name: string): Promise<Role>;
}
