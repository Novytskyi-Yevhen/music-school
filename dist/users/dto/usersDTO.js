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
exports.UsersDTO = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const dto_1 = require("../../shared/dto");
class UsersDTO {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UsersDTO.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(5),
    (0, class_validator_1.MaxLength)(15),
    __metadata("design:type", String)
], UsersDTO.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], UsersDTO.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsPhoneNumber)(),
    __metadata("design:type", String)
], UsersDTO.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => dto_1.IdDTO),
    __metadata("design:type", dto_1.IdDTO)
], UsersDTO.prototype, "role", void 0);
exports.UsersDTO = UsersDTO;
//# sourceMappingURL=usersDTO.js.map