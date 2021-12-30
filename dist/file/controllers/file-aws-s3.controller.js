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
exports.AWSS3Controller = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const guards_1 = require("../../auth/guards");
const providers_1 = require("../providers");
let AWSS3Controller = class AWSS3Controller {
    constructor(fileService, awsS3Service) {
        this.fileService = fileService;
        this.awsS3Service = awsS3Service;
    }
    async uploadFileToS3(file, req) {
        const s3Response = await this.awsS3Service.uploadFile(file, req.user);
        return this.fileService.create({
            awsKey: s3Response.Key,
            awsLink: s3Response.Location,
            originalName: file.originalname,
            mimeType: file.mimetype,
            size: file.size,
            user: { id: req.user['userId'] },
        });
    }
    async getFile(fileId, req, res) {
        const file = await this.fileService.findOneById(fileId);
        if (req.user['userId'] === file.user.id) {
            await (await this.awsS3Service.getFile(file.awsKey)).pipe(res);
            return;
        }
        throw new common_1.HttpException("You don't have access to this file.", common_1.HttpStatus.FORBIDDEN);
    }
    async delete(fileId, req) {
        const file = await this.fileService.findOneById(fileId);
        if (req.user['userId'] !== file.user.id) {
            throw new common_1.HttpException('You do not have access to this file.', common_1.HttpStatus.FORBIDDEN);
        }
        await this.awsS3Service.delete(file.awsKey);
        if (!(await this.awsS3Service.isDeleted(file.awsKey))) {
            throw new common_1.HttpException('File is not removed from AWS.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
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
    (0, common_1.Post)('upload-to-s3'),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AWSS3Controller.prototype, "uploadFileToS3", null);
__decorate([
    (0, common_1.Get)('getById'),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    __param(0, (0, common_1.Query)('fileId')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], AWSS3Controller.prototype, "getFile", null);
__decorate([
    (0, common_1.Delete)('/delete/:fileId'),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('fileId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AWSS3Controller.prototype, "delete", null);
AWSS3Controller = __decorate([
    (0, common_1.Controller)('file'),
    __metadata("design:paramtypes", [providers_1.FileService,
        providers_1.AWSS3Service])
], AWSS3Controller);
exports.AWSS3Controller = AWSS3Controller;
//# sourceMappingURL=file-aws-s3.controller.js.map