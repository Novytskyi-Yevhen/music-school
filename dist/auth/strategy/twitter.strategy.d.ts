declare const TwitterStrategy_base: new (...args: any[]) => any;
export declare class TwitterStrategy extends TwitterStrategy_base {
    constructor();
    validate(accessToken: string, refreshToken: string, profile: any, done: (err: any, user: any, info?: any) => void): Promise<void>;
}
export {};
