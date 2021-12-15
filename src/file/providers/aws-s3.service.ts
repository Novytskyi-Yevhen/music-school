import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
require('dotenv').config();
@Injectable()
export class AWSS3Service {
  AWS_S3_BUCKET = process.env.AWS_S3_BUCKET_NAME;
  s3 = new AWS.S3({
    accessKeyId: process.env.AWS_S3_ACCESS_KEY,
    secretAccessKey: process.env.AWS_S3_KEY_SECRET,
    region: process.env.AWS_S3_REGION,
  });

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
  async getFile(awsKey: string) {
    return await this.s3
      .getObject({ Bucket: this.AWS_S3_BUCKET, Key: awsKey })
      .createReadStream();
  }
  async delete(awsKey: string) {
    return await this.s3
      .deleteObject({ Bucket: this.AWS_S3_BUCKET, Key: awsKey })
      .promise();
  }
  async isDeleted(awsKey: string) {
    try {
      await this.s3
        .headObject({ Bucket: this.AWS_S3_BUCKET, Key: awsKey })
        .promise();
      return false;
    } catch (error) {
      console.log(error);
      return true;
    }
  }
}
