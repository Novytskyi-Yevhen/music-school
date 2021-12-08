import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { FileService } from '../providers';

@Controller('file')
export class FileControllerextends {
  constructor(
    private fileService: FileService,
  ) {}

  @Get()
  async findAll() {
    return await this.fileService.findAll();
  }

  @Get('/findOneById')
  async findOneById(@Query('id') id: number) {
    return await this.fileService.findOneById(id);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body('userId') userId: number,
  ) {
    const { originalname, mimetype, size } = file;
    const redisKey = `${userId}:${file.mimetype}:${file.originalname}`;
    
    if ((await this.fileService.redisGet(redisKey))) {
      throw new HttpException('Redis has this key', HttpStatus.BAD_REQUEST);
    }
    const newFile = await this.fileService.create({
      originalName: originalname,
      mimeType: mimetype,
      size,
      redisKey,
    });
    await this.fileService.redisSet(newFile.redisKey, file.buffer);
    return newFile;
  }

  @Get('getFile')
  async getFile(@Res() res: Response, @Query('fileId') fileId: number) {
    const file = await this.fileService.findOneById(fileId);
    const redisValue = await this.fileService.redisGet(file.redisKey);
    return res
      .set({
        'Content-Type': file.mimeType,
        'Content-Length': file.size,
      })
      .send(Buffer.from(redisValue.data, 'base64'));
  }
  @Delete('/delete/:id')
  async delete(@Param('id') id: number) {
    const file = await this.fileService.findOneById(id);
    if (!(await this.fileService.redisGet(file.redisKey))) {
      throw new HttpException('Redis does not has this key. Or db does not has this id.', HttpStatus.BAD_REQUEST);
    }
    await this.fileService.redisDelete(file.redisKey);
    let { affected } = await this.fileService.delete(id);
    return affected === 0
      ? {
          statusCode: HttpStatus.BAD_REQUEST,
          message: `File for delete is not found`,
        }
      : {
          statusCode: HttpStatus.OK,
          message: `File deleted successfully`,
        };
  }
  
}
