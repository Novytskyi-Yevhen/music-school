"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChildModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const entity_1 = require("../shared/entity");
const providers_1 = require("./providers");
const controllers = require("./controllers");
const providers = require("./providers");
let ChildModule = class ChildModule {
};
ChildModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([entity_1.Child])],
        exports: [providers_1.ChildService],
        providers: Object.values(providers),
        controllers: Object.values(controllers),
    })
], ChildModule);
exports.ChildModule = ChildModule;
//# sourceMappingURL=child.module.js.map