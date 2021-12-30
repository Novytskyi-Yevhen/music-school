"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const usersDTO_1 = require("../../users/dto/usersDTO");
const providers_1 = require("../../users/providers");
const jwt_auth_guard_1 = require("../guards/jwt-auth.guard");
const index_1 = require("../guards/index");
const auth_service_1 = require("../providers/auth.service");
const providers_2 = require("../../role/providers");
const config_1 = require("../../config");
const passport_1 = require("@nestjs/passport");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
const bcrypt = require("bcrypt");
let AuthController = class AuthController {
    constructor(authService, userService, roleService, httpService) {
        this.authService = authService;
        this.userService = userService;
        this.roleService = roleService;
        this.httpService = httpService;
    }
    async login(req) {
        return this.authService.jwtLogin(req.user, 'login');
    }
    getProfile(req) {
        return req.user;
    }
    async register(data) {
        data.role = await this.roleService.findOneByName(config_1.registrationRole);
        const salt = await bcrypt.genSalt();
        data.password = await bcrypt.hash(data.password, salt);
        const newUser = await this.userService.create(data);
        return await this.authService.jwtLogin(newUser, 'register');
    }
    async googleRedirect(req) {
        return await this.socialRegisterOrLogin(req);
    }
    async facebookRedirect(req) {
        return await this.socialRegisterOrLogin(req);
    }
    async linkedinRedirect(req) {
        return await this.socialRegisterOrLogin(req);
    }
    async googleAuth() { }
    async facebookAuth() { }
    async linkedinAuth() { }
    async socialRegisterOrLogin(req) {
        var _a, _b, _c;
        if (!req.user) {
            throw new common_1.HttpException('BadRequest', common_1.HttpStatus.BAD_REQUEST);
        }
        let user = await this.userService.getUserBySocialId(req.user.provider, req.user.socialId);
        if (user === null) {
            throw new common_1.HttpException('This provider does not supported', common_1.HttpStatus.BAD_REQUEST);
        }
        if (!user) {
            let response = null;
            if (req.user.provider === 'google') {
                response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`https://people.googleapis.com/v1/people/${req.user.socialId}?personFields=phoneNumbers`, { headers: { Authorization: `Bearer ${req.user.accessToken}` } }));
            }
            const phone = ((_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.phoneNumbers)
                ? (_c = (_b = response.data) === null || _b === void 0 ? void 0 : _b.phoneNumbers[0]) === null || _c === void 0 ? void 0 : _c.canonicalForm
                : null;
            const googleId = req.user.provider === 'google' ? req.user.socialId : null;
            const facebookId = req.user.provider === 'facebook' ? req.user.socialId : null;
            const linkedinId = req.user.provider === 'linkedin' ? req.user.socialId : null;
            const newUser = Object.assign({ linkedinId, facebookId, googleId, phone }, req.user);
            return await this.register(newUser);
        }
        else {
            let user = await this.userService.getUserBySocialId(req.user.provider, req.user.socialId);
            return await this.login({ user });
        }
    }
};
__decorate([
    (0, common_1.UseGuards)(index_1.LocalAuthGuard),
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('/profile'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Post)('/register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [usersDTO_1.UsersDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Get)('auth/redirect/google'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('google')),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleRedirect", null);
__decorate([
    (0, common_1.Get)('auth/redirect/facebook'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('facebook')),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "facebookRedirect", null);
__decorate([
    (0, common_1.Get)('auth/redirect/linkedin'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('linkedin')),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "linkedinRedirect", null);
__decorate([
    (0, common_1.Get)('google'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('google')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleAuth", null);
__decorate([
    (0, common_1.Get)('facebook'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('facebook')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "facebookAuth", null);
__decorate([
    (0, common_1.Get)('linkedin'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('linkedin')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "linkedinAuth", null);
AuthController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        providers_1.UserService,
        providers_2.RoleService,
        axios_1.HttpService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controllers.js.map