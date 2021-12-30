import { User } from ".";
export declare class File {
    id: string;
    originalName: string;
    mimeType: string;
    size: number;
    awsLink: string;
    awsKey: string;
    redisKey: string;
    user: User;
}
