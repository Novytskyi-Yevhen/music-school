"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const user_module_1 = require("../users/user.module");
const index_1 = require("./providers/index");
const index_2 = require("./strategy/index");
const controllers = require("./controllers/index");
const jwt_1 = require("@nestjs/jwt");
const role_module_1 = require("../role/role.module");
const axios_1 = require("@nestjs/axios");
const linkedin_strategy_1 = require("./strategy/linkedin.strategy");
require('dotenv').config();
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [user_module_1.UserModule, role_module_1.RoleModule, passport_1.PassportModule, axios_1.HttpModule,
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET,
                signOptions: { expiresIn: '1h' }
            })
        ],
        controllers: Object.values(controllers),
        providers: [index_1.AuthService, index_2.LocalStrategy, index_2.JwtStrategy, index_2.GoogleStrategy, index_2.FacebookStrategy, index_2.TwitterStrategy, linkedin_strategy_1.LinkedinStrategy],
        exports: [index_1.AuthService]
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map