/// <reference types="node" />
import * as AWS from 'aws-sdk';
export declare class AWSS3Service {
    AWS_S3_BUCKET: string;
    s3: AWS.S3;
    uploadFile(file: any, user: any): Promise<AWS.S3.ManagedUpload.SendData>;
    getFile(awsKey: string): Promise<import("stream").Readable>;
    delete(awsKey: string): Promise<import("aws-sdk/lib/request").PromiseResult<AWS.S3.DeleteObjectOutput, AWS.AWSError>>;
    isDeleted(awsKey: string): Promise<boolean>;
}
