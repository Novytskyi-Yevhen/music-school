import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { RolesGuard } from './common/guards/roles.guard';
import { Board, Child, Course, Order, Role, Room, Service, Task, User } from './shared/entity';
import { RoleModule } from './role/role.module';
import { UserModule } from './users/user.module';
import { HTTPLogger } from './common/logger/http.logger';
require('dotenv').config();
@Module({
  imports: [
    TypeOrmModule.forFeature([Child, Order, Service, Course, Room, Task, Board]),
    UserModule,
    AuthModule,
    RoleModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.POSTGRES_PORT) || 5432,
      username: process.env.POSTGRES_USER || 'user',
      password: process.env.POSTGRES_PASSWORD || 'pg_pass',
      database: process.env.POSTGRES_DB_NAME || 'postgres',
      entities: [User, Child, Order, Service, Course, Room, Task, Board, Role],
      synchronize: true
    })
  ],
  providers: [{
    provide: 'APP_GUARD',
    useClass: RolesGuard,
  }]
})
export class MainModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(HTTPLogger).forRoutes('*');
  }
}
