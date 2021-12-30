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
exports.Service = void 0;
const typeorm_1 = require("typeorm");
const _1 = require(".");
const class_validator_1 = require("class-validator");
let Service = class Service {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Service.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar'),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], Service.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar'),
    __metadata("design:type", String)
], Service.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar'),
    (0, class_validator_1.IsIn)(['trial', 'flexi', 'regular']),
    __metadata("design:type", String)
], Service.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((type) => _1.Order, (order) => order.service),
    __metadata("design:type", Array)
], Service.prototype, "orders", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((type) => _1.Course, (course) => course.service),
    __metadata("design:type", Array)
], Service.prototype, "courses", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((type) => _1.Room, (room) => room.service),
    __metadata("design:type", Array)
], Service.prototype, "rooms", void 0);
Service = __decorate([
    (0, typeorm_1.Entity)()
], Service);
exports.Service = Service;
//# sourceMappingURL=service.entity.js.map