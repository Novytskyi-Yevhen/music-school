"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const entity_1 = require("../shared/entity");
const providers_1 = require("./providers");
const controllers = require("./controllers");
const providers = require("./providers");
const redisStore = require("cache-manager-redis-store");
const user_module_1 = require("../users/user.module");
require('dotenv').config();
let FileModule = class FileModule {
};
FileModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([entity_1.File]),
            common_1.CacheModule.register({
                store: redisStore,
                host: process.env.REDIS_LOCALHOST,
                port: Number(process.env.REDIS_PORT),
            }),
            user_module_1.UserModule
        ],
        exports: [providers_1.FileService],
        providers: Object.values(providers),
        controllers: Object.values(controllers),
    })
], FileModule);
exports.FileModule = FileModule;
//# sourceMappingURL=file.module.js.map