import { CACHE_MANAGER, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cache } from 'cache-manager';
import { GenericService } from 'src/shared/service';
import { File } from 'src/shared/entity';
import { Repository } from 'typeorm';

export class FileService extends GenericService<File> {
  constructor(
    @InjectRepository(File) private fileRepository: Repository<File>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {
    super(fileRepository);
  }
  async redisGet(key: string): Promise<any> {
    return await this.cacheManager.get(key);
  }
  async redisSet(key: string, value: any) {
    return await this.cacheManager.set(key, value, {ttl: 0});
  }
  async redisDelete(key: string){
    return await this.cacheManager.del(key);
  }
}
