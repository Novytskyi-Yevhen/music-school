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
exports.Course = void 0;
const typeorm_1 = require("typeorm");
const _1 = require(".");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
let Course = class Course {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Course.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar'),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], Course.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => _1.Service, service => service.courses),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => _1.Service),
    (0, class_validator_1.IsNotEmptyObject)(),
    __metadata("design:type", _1.Service)
], Course.prototype, "service", void 0);
Course = __decorate([
    (0, typeorm_1.Entity)()
], Course);
exports.Course = Course;
//# sourceMappingURL=course.entity.js.map