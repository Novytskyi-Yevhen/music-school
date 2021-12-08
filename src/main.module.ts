import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { RolesGuard } from './common/guards/roles.guard';
import {
  Board,
  Chat,
  Child,
  Course,
  File,
  Instrument,
  Message,
  Order,
  Role,
  Room,
  Service,
  Task,
  Teacher,
  User,
} from './shared/entity';
import { RoleModule } from './role/role.module';
import { UserModule } from './users/user.module';
import { HTTPLogger } from './common/logger/http.logger';
import { OrderModule } from './order/order.module';
import { CourseModule } from './course/course.module';
import { ChildModule } from './child/child.module';
import { ServiceModule } from './service/service.module';
import { RoomModule } from './room/room.module';
import { TaskModule } from './task/task.module';
import { BoardModule } from './board/board.module';
import { GatewayModule } from './websocket/gateway.module';
import { RoomGateway } from './websocket/gateway';
import { ChatModule } from './chat/chat.module';
import { MessageModule } from './message/message.module';
import { InstrumentModule } from './instrument/instrument.module';
import { TeacherModule } from './teacher/teacher.module';
import { FileModule } from './file/file.module';
require('dotenv').config();
@Module({
  imports: [
    // TypeOrmModule.forFeature([Message, Chat]),
    // GatewayModule,
    FileModule,
    TeacherModule,
    InstrumentModule,
    MessageModule,
    ChatModule,
    BoardModule,
    TaskModule,
    RoomModule,
    ServiceModule,
    ChildModule,
    CourseModule,
    OrderModule,
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
      entities: [
        User,
        Child,
        Order,
        Service,
        Course,
        Room,
        Task,
        Board,
        Role,
        Message,
        Chat,
        Teacher,
        Instrument,
        File
      ],
      synchronize: true,
    }),
  ],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: RolesGuard,
    },
    // AppGateway,
    RoomGateway,
  ],
})
export class MainModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(HTTPLogger).forRoutes('*');
  }
}
