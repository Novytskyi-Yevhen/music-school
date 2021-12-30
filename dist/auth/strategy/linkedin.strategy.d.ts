declare const LinkedinStrategy_base: new (...args: any[]) => any;
export declare class LinkedinStrategy extends LinkedinStrategy_base {
    constructor();
    validate(accessToken: string, refreshToken: string, profile: any, done: (err: any, user: any, info?: any) => void): Promise<void>;
}
export {};
