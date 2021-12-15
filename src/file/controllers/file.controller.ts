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
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/guards';
import { UserService } from 'src/users/providers';
import { FileService } from '../providers';

@Controller('file')
export class FileController {
  constructor(
    private fileService: FileService,
    private userService: UserService
  ) {}

  @Get()
  async findAll() {
    return await this.fileService.findAll();
  }

  @Get('/findOneById')
  async findOneById(@Query('id') id: string) {
    return await this.fileService.findOneById(id);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body('userId') userId: string,
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
      user: {id: userId}
    });
    await this.fileService.redisSet(newFile.redisKey, file.buffer);
    return newFile;
  }

  @Get('getFile')
  @UseGuards(JwtAuthGuard)
  async getFile(@Res() res: Response, @Query('fileId') fileId: string, @Req() req) {
    const userFilesId = await (await (await this.userService.findOneById(req.user.id)).files).map(elem => elem.id);
    if (!userFilesId.includes(fileId)) {
      throw new HttpException('You do not have access to this file.', HttpStatus.FORBIDDEN);
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
  @Delete('/delete/:fileId')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('fileId') fileId: string, @Req() req) {
    const userFilesId = await (await (await this.userService.findOneById(req.user.id)).files).map(elem => elem.id)
    if (!userFilesId.includes(fileId)) {
      throw new HttpException('You do not have access to this file.', HttpStatus.FORBIDDEN);
    }
    const file = await this.fileService.findOneById(fileId);
    if (!(await this.fileService.redisGet(file.redisKey))) {
      throw new HttpException('Redis does not has this key. Or db does not has this id.', HttpStatus.BAD_REQUEST);
    }
    await this.fileService.redisDelete(file.redisKey);
    let { affected } = await this.fileService.delete(fileId);
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
