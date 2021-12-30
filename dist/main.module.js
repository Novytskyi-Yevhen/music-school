"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("./auth/auth.module");
const roles_guard_1 = require("./common/guards/roles.guard");
const entity_1 = require("./shared/entity");
const role_module_1 = require("./role/role.module");
const user_module_1 = require("./users/user.module");
const http_logger_1 = require("./common/logger/http.logger");
const order_module_1 = require("./order/order.module");
const course_module_1 = require("./course/course.module");
const child_module_1 = require("./child/child.module");
const service_module_1 = require("./service/service.module");
const room_module_1 = require("./room/room.module");
const task_module_1 = require("./task/task.module");
const board_module_1 = require("./board/board.module");
const gateway_1 = require("./websocket/gateway");
const chat_module_1 = require("./chat/chat.module");
const message_module_1 = require("./message/message.module");
const instrument_module_1 = require("./instrument/instrument.module");
const teacher_module_1 = require("./teacher/teacher.module");
const file_module_1 = require("./file/file.module");
require('dotenv').config();
let MainModule = class MainModule {
    configure(consumer) {
        consumer.apply(http_logger_1.HTTPLogger).forRoutes('*');
    }
};
MainModule = __decorate([
    (0, common_1.Module)({
        imports: [
            file_module_1.FileModule,
            teacher_module_1.TeacherModule,
            instrument_module_1.InstrumentModule,
            message_module_1.MessageModule,
            chat_module_1.ChatModule,
            board_module_1.BoardModule,
            task_module_1.TaskModule,
            room_module_1.RoomModule,
            service_module_1.ServiceModule,
            child_module_1.ChildModule,
            course_module_1.CourseModule,
            order_module_1.OrderModule,
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            role_module_1.RoleModule,
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: process.env.DB_HOST || 'localhost',
                port: Number(process.env.POSTGRES_PORT) || 5432,
                username: process.env.POSTGRES_USER || 'user',
                password: process.env.POSTGRES_PASSWORD || 'pg_pass',
                database: process.env.POSTGRES_DB_NAME || 'postgres',
                entities: [
                    entity_1.User,
                    entity_1.Child,
                    entity_1.Order,
                    entity_1.Service,
                    entity_1.Course,
                    entity_1.Room,
                    entity_1.Task,
                    entity_1.Board,
                    entity_1.Role,
                    entity_1.Message,
                    entity_1.Chat,
                    entity_1.Teacher,
                    entity_1.Instrument,
                    entity_1.File
                ],
                synchronize: true,
            }),
        ],
        providers: [
            {
                provide: 'APP_GUARD',
                useClass: roles_guard_1.RolesGuard,
            },
            gateway_1.RoomGateway,
        ],
    })
], MainModule);
exports.MainModule = MainModule;
//# sourceMappingURL=main.module.js.map