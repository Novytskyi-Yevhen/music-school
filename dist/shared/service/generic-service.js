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
exports.GenericService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let GenericService = class GenericService {
    constructor(repository) {
        this.repository = repository;
    }
    async findAll() {
        return await this.repository.find();
    }
    async findOneById(id) {
        return await this.repository.findOne(id);
    }
    async create(data) {
        const newObject = this.repository.create(data);
        await this.repository.save(newObject);
        return newObject;
    }
    async delete(id) {
        return await this.repository.delete(id);
    }
    async update(id, data) {
        await this.repository.update(id, data);
        return await this.repository.findOne(id);
    }
};
GenericService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], GenericService);
exports.GenericService = GenericService;
//# sourceMappingURL=generic-service.js.map