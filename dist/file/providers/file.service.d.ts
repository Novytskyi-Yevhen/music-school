import { Cache } from 'cache-manager';
import { GenericService } from 'src/shared/service';
import { File } from 'src/shared/entity';
import { Repository } from 'typeorm';
export declare class FileService extends GenericService<File> {
    private fileRepository;
    private cacheManager;
    constructor(fileRepository: Repository<File>, cacheManager: Cache);
    redisGet(key: string): Promise<any>;
    redisSet(key: string, value: any): Promise<any>;
    redisDelete(key: string): Promise<any>;
}
