/// <reference types="multer" />
import { HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from 'src/users/providers';
import { FileService } from '../providers';
export declare class FileController {
    private fileService;
    private userService;
    constructor(fileService: FileService, userService: UserService);
    findAll(): Promise<import("../../shared/entity").File[]>;
    findOneById(id: string): Promise<import("../../shared/entity").File>;
    uploadFile(file: Express.Multer.File, userId: string): Promise<import("../../shared/entity").File>;
    getFile(res: Response, fileId: string, req: any): Promise<Response<any, Record<string, any>>>;
    delete(fileId: string, req: any): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
}
