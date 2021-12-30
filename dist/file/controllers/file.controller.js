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
exports.FileController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const guards_1 = require("../../auth/guards");
const providers_1 = require("../../users/providers");
const providers_2 = require("../providers");
let FileController = class FileController {
    constructor(fileService, userService) {
        this.fileService = fileService;
        this.userService = userService;
    }
    async findAll() {
        return await this.fileService.findAll();
    }
    async findOneById(id) {
        return await this.fileService.findOneById(id);
    }
    async uploadFile(file, userId) {
        const { originalname, mimetype, size } = file;
        const redisKey = `${userId}:${file.mimetype}:${file.originalname}`;
        if ((await this.fileService.redisGet(redisKey))) {
            throw new common_1.HttpException('Redis has this key', common_1.HttpStatus.BAD_REQUEST);
        }
        const newFile = await this.fileService.create({
            originalName: originalname,
            mimeType: mimetype,
            size,
            redisKey,
            user: { id: userId }
        });
        await this.fileService.redisSet(newFile.redisKey, file.buffer);
        return newFile;
    }
    async getFile(res, fileId, req) {
        const userFilesId = await (await (await this.userService.findOneById(req.user.id)).files).map(elem => elem.id);
        if (!userFilesId.includes(fileId)) {
            throw new common_1.HttpException('You do not have access to this file.', common_1.HttpStatus.FORBIDDEN);
        }
        const file = await this.fileService.findOneById(fileId);
        const redisValue = await this.fileService.redisGet(file.redisKey);
        return res
            .set({
            'Content-Type': file.mimeType,
            'Content-Length': file.size,
        })
            .send(Buffer.from(redisValue.data, 'base64'));
    }
    async delete(fileId, req) {
        const userFilesId = await (await (await this.userService.findOneById(req.user.id)).files).map(elem => elem.id);
        if (!userFilesId.includes(fileId)) {
            throw new common_1.HttpException('You do not have access to this file.', common_1.HttpStatus.FORBIDDEN);
        }
        const file = await this.fileService.findOneById(fileId);
        if (!(await this.fileService.redisGet(file.redisKey))) {
            throw new common_1.HttpException('Redis does not has this key. Or db does not has this id.', common_1.HttpStatus.BAD_REQUEST);
        }
        await this.fileService.redisDelete(file.redisKey);
        let { affected } = await this.fileService.delete(fileId);
        return affected === 0
            ? {
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                message: `File for delete is not found`,
            }
            : {
                statusCode: common_1.HttpStatus.OK,
                message: `File deleted successfully`,
            };
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FileController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('/findOneById'),
    __param(0, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FileController.prototype, "findOneById", null);
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], FileController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Get)('getFile'),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('fileId')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], FileController.prototype, "getFile", null);
__decorate([
    (0, common_1.Delete)('/delete/:fileId'),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('fileId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], FileController.prototype, "delete", null);
FileController = __decorate([
    (0, common_1.Controller)('file'),
    __metadata("design:paramtypes", [providers_2.FileService,
        providers_1.UserService])
], FileController);
exports.FileController = FileController;
//# sourceMappingURL=file.controller.js.map