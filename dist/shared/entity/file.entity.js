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
exports.File = void 0;
const typeorm_1 = require("typeorm");
const _1 = require(".");
const class_validator_1 = require("class-validator");
let File = class File {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], File.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar'),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], File.prototype, "originalName", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar'),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], File.prototype, "mimeType", void 0);
__decorate([
    (0, typeorm_1.Column)('int'),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], File.prototype, "size", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar'),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], File.prototype, "awsLink", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar'),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], File.prototype, "awsKey", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar'),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], File.prototype, "redisKey", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => _1.User, user => user.files, { eager: true }),
    __metadata("design:type", _1.User)
], File.prototype, "user", void 0);
File = __decorate([
    (0, typeorm_1.Entity)()
], File);
exports.File = File;
//# sourceMappingURL=file.entity.js.map