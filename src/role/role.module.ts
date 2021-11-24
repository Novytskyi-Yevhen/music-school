import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/entity';
import * as controllers from './controllers';
import * as providers from './providers';
import { RoleService } from './providers';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  exports: [RoleService],
  providers: Object.values(providers),
  controllers: Object.values(controllers)
})
export class RoleModule {}
