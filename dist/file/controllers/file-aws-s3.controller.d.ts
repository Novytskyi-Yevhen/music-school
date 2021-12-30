/// <reference types="multer" />
import { HttpStatus } from '@nestjs/common';
import { Request } from 'express';
import { AWSS3Service, FileService } from '../providers';
export declare class AWSS3Controller {
    private fileService;
    private awsS3Service;
    constructor(fileService: FileService, awsS3Service: AWSS3Service);
    uploadFileToS3(file: Express.Multer.File, req: Request): Promise<import("../../shared/entity").File>;
    getFile(fileId: string, req: Request, res: any): Promise<void>;
    delete(fileId: string, req: any): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
}
