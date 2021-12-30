import { HttpStatus } from '@nestjs/common';
import { AbstractCRUDController } from 'src/shared/controllers';
import { User } from 'src/shared/entity';
import { UsersDTO } from '../dto/usersDTO';
import { UserService } from '../providers/user.service';
export declare class UserController extends AbstractCRUDController<UsersDTO, User, UserService> {
    private readonly userService;
    constructor(userService: UserService);
    findAll(): Promise<User[]>;
    findOneByName(name: string): Promise<User>;
    findOneById(id: string): Promise<User>;
    update(id: string, data: Partial<UsersDTO>): Promise<User>;
    createUser(data: UsersDTO): Promise<User>;
    delete(id: string): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
}
