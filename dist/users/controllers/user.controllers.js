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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const guards_1 = require("../../auth/guards");
const roles_decorators_1 = require("../../common/decorators/roles.decorators");
const controllers_1 = require("../../shared/controllers");
const entity_1 = require("../../shared/entity");
const usersDTO_1 = require("../dto/usersDTO");
const user_service_1 = require("../providers/user.service");
let UserController = class UserController extends controllers_1.AbstractCRUDController {
    constructor(userService) {
        super(userService, 'User');
        this.userService = userService;
    }
    async findAll() {
        return await super.findAll();
    }
    async findOneByName(name) {
        return await this.userService.findOneByName(name);
    }
    async findOneById(id) {
        return await super.findOneById(id);
    }
    async update(id, data) {
        return await super.update(id, data);
    }
    async createUser(data) {
        return await super.create(data);
    }
    async delete(id) {
        let { affected } = await this.userService.delete(id);
        return affected === 0
            ? {
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                message: 'User for delete is not found',
            }
            : {
                statusCode: common_1.HttpStatus.OK,
                message: 'User deleted successfully',
            };
    }
};
__decorate([
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, roles_decorators_1.Roles)('admin'),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, roles_decorators_1.Roles)('admin'),
    (0, common_1.Get)('/findOneByName'),
    __param(0, (0, common_1.Query)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findOneByName", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, roles_decorators_1.Roles)('admin'),
    (0, common_1.Get)('/findOneById'),
    __param(0, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findOneById", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, roles_decorators_1.Roles)('admin'),
    (0, common_1.Patch)('/update/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [usersDTO_1.UsersDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, roles_decorators_1.Roles)('admin'),
    (0, common_1.Delete)('/delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "delete", null);
UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controllers.js.map