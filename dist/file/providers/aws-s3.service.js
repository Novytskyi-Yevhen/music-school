"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AWSS3Service = void 0;
const common_1 = require("@nestjs/common");
const AWS = require("aws-sdk");
require('dotenv').config();
let AWSS3Service = class AWSS3Service {
    constructor() {
        this.AWS_S3_BUCKET = process.env.AWS_S3_BUCKET_NAME;
        this.s3 = new AWS.S3({
            accessKeyId: process.env.AWS_S3_ACCESS_KEY,
            secretAccessKey: process.env.AWS_S3_KEY_SECRET,
            region: process.env.AWS_S3_REGION,
        });
    }
    async uploadFile(file, user) {
        const { originalname, buffer, mimetype } = file;
        return this.s3
            .upload({
            Bucket: this.AWS_S3_BUCKET,
            Key: `${user.userId}/${mimetype}/${String(originalname)}`,
            Body: buffer,
            ACL: 'bucket-owner-full-control',
            ContentType: mimetype,
        })
            .promise();
    }
    async getFile(awsKey) {
        return await this.s3
            .getObject({ Bucket: this.AWS_S3_BUCKET, Key: awsKey })
            .createReadStream();
    }
    async delete(awsKey) {
        return await this.s3
            .deleteObject({ Bucket: this.AWS_S3_BUCKET, Key: awsKey })
            .promise();
    }
    async isDeleted(awsKey) {
        try {
            await this.s3
                .headObject({ Bucket: this.AWS_S3_BUCKET, Key: awsKey })
                .promise();
            return false;
        }
        catch (error) {
            console.log(error);
            return true;
        }
    }
};
AWSS3Service = __decorate([
    (0, common_1.Injectable)()
], AWSS3Service);
exports.AWSS3Service = AWSS3Service;
//# sourceMappingURL=aws-s3.service.js.map