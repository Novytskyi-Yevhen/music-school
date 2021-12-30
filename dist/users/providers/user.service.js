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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const service_1 = require("../../shared/service");
const entity_1 = require("../../shared/entity");
const typeorm_2 = require("typeorm");
let UserService = class UserService extends service_1.GenericService {
    constructor(usersRepository) {
        super(usersRepository);
        this.usersRepository = usersRepository;
    }
    async findOneByName(name) {
        return await this.usersRepository.findOne({ name });
    }
    async findOneByEmail(email) {
        return await this.usersRepository.findOne({ email });
    }
    async findOneByGoogleId(googleId) {
        return await this.usersRepository.findOne({ googleId });
    }
    async findOneByFacebookId(facebookId) {
        return await this.usersRepository.findOne({ facebookId });
    }
    async findOneByLinkedinId(facebookId) {
        return await this.usersRepository.findOne({ facebookId });
    }
    async getUserBySocialId(provider, id) {
        let user;
        switch (provider) {
            case 'facebook':
                user = await this.findOneByFacebookId(id);
                break;
            case 'google':
                user = await this.findOneByGoogleId(id);
                break;
            case 'linkedin':
                user = await this.findOneByLinkedinId(id);
                break;
            default:
                user = null;
                break;
        }
        return user;
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map