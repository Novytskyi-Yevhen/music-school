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
exports.RoleController = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("../../config");
const controllers_1 = require("../../shared/controllers");
const entity_1 = require("../../shared/entity");
const providers_1 = require("../providers");
let RoleController = class RoleController extends controllers_1.AbstractCRUDController {
    constructor(roleService) {
        super(roleService, 'Role');
        this.roleService = roleService;
    }
    async delete(id) {
        const role = await this.roleService.findOneById(id);
        if (config_1.defaultRole.includes(role.name.toLowerCase())) {
            throw new common_1.HttpException('This is the default role. You do not have permission to delete.', common_1.HttpStatus.BAD_REQUEST);
        }
        let { affected } = await this.roleService.delete(id);
        return affected === 0
            ? {
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                message: `Role for delete is not found`,
            }
            : {
                statusCode: common_1.HttpStatus.OK,
                message: `Role deleted successfully`,
            };
    }
};
__decorate([
    (0, common_1.Delete)('/delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "delete", null);
RoleController = __decorate([
    (0, common_1.Controller)('role'),
    __metadata("design:paramtypes", [providers_1.RoleService])
], RoleController);
exports.RoleController = RoleController;
//# sourceMappingURL=role.controller.js.map