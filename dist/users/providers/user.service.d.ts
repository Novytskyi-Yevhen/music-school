import { GenericService } from 'src/shared/service';
import { User } from 'src/shared/entity';
import { Repository } from 'typeorm';
export declare class UserService extends GenericService<User> {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    findOneByName(name: string): Promise<User>;
    findOneByEmail(email: string): Promise<User>;
    private findOneByGoogleId;
    private findOneByFacebookId;
    private findOneByLinkedinId;
    getUserBySocialId(provider: string, id: string): Promise<any>;
}
