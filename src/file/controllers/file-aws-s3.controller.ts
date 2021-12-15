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
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guards';
import { AWSS3Service, FileService } from '../providers';

@Controller('file')
export class AWSS3Controller {
  constructor(
    private fileService: FileService,
    private awsS3Service: AWSS3Service,
  ) {}

  @Post('upload-to-s3')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadFileToS3(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ) {
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
  @Get('getById')
  @UseGuards(JwtAuthGuard)
  async getFile(
    @Query('fileId') fileId: string,
    @Req() req: Request,
    @Res() res,
  ) {
    const file = await this.fileService.findOneById(fileId);
    if (req.user['userId'] === file.user.id) {
      await (await this.awsS3Service.getFile(file.awsKey)).pipe(res);
      return;
    }
    throw new HttpException(
      "You don't have access to this file.",
      HttpStatus.FORBIDDEN,
    );
  }
  @Delete('/delete/:fileId')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('fileId') fileId: string, @Req() req) {
    const file = await this.fileService.findOneById(fileId);
    if (req.user['userId'] !== file.user.id) {
      throw new HttpException(
        'You do not have access to this file.',
        HttpStatus.FORBIDDEN,
      );
    }
    await this.awsS3Service.delete(file.awsKey);
    if (!(await this.awsS3Service.isDeleted(file.awsKey))) {
      throw new HttpException(
        'File is not removed from AWS.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
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
