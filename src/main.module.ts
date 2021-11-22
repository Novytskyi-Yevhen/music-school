import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board, Child, Course, Order, Room, Service, Task, User } from './entity';
import { UserModule } from './users/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Child, Order, Service, Course, Room, Task, Board]),
    UserModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'user',
      password: 'pg_pass',
      database: 'postgres',
      entities: [User, Child, Order, Service, Course, Room, Task, Board],
      synchronize: true
    })
  ],
})
export class MainModule {}
