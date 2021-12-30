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
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const typeorm_1 = require("typeorm");
const _1 = require(".");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const teacher_entity_1 = require("./teacher.entity");
let User = class User {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { unique: true, nullable: true }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], User.prototype, "googleId", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { unique: true, nullable: true }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], User.prototype, "facebookId", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { unique: true, nullable: true }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], User.prototype, "linkedinId", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar'),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { nullable: true }),
    (0, class_validator_1.MinLength)(5),
    (0, class_validator_1.MaxLength)(15),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { unique: true }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { nullable: true }),
    (0, class_validator_1.IsPhoneNumber)(),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((type) => _1.Order, (order) => order.user, { eager: true }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsObject)({ each: true }),
    __metadata("design:type", Array)
], User.prototype, "orders", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((type) => _1.Child, (child) => child.user, { eager: true }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsObject)({ each: true }),
    __metadata("design:type", Array)
], User.prototype, "childs", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => _1.Role, (role) => role.users, { eager: true }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => _1.Role),
    __metadata("design:type", _1.Role)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => _1.Chat, (chat) => chat.users),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Promise)
], User.prototype, "chats", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => _1.Message, (message) => message.user),
    __metadata("design:type", Array)
], User.prototype, "messages", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => teacher_entity_1.Teacher),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", teacher_entity_1.Teacher)
], User.prototype, "teacher", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((type) => _1.File, (file) => file.user),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Promise)
], User.prototype, "files", void 0);
User = __decorate([
    (0, typeorm_1.Entity)()
], User);
exports.User = User;
//# sourceMappingURL=user.entity.js.map