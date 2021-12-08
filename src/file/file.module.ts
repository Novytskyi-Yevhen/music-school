import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from 'src/shared/entity';
import { FileService } from './providers';
import * as controllers from './controllers';
import * as providers from './providers';
import type { ClientOpts as RedisClientOpts } from 'redis';
import * as redisStore from 'cache-manager-redis-store';
require('dotenv').config();
@Module({
  imports: [
    TypeOrmModule.forFeature([File]),
    CacheModule.register<RedisClientOpts>({
      store: redisStore,
      host: process.env.REDIS_LOCALHOST,
      port: Number(process.env.REDIS_PORT),
    }),
  ],
  exports: [FileService],
  providers: Object.values(providers),
  controllers: Object.values(controllers),
})
export class FileModule {}
