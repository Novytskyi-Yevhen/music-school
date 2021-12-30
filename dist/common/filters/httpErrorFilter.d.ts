import { ExceptionFilter, ArgumentsHost, Logger } from '@nestjs/common';
export declare class HttpErrorFilter implements ExceptionFilter {
    private readonly logger;
    constructor(logger: Logger);
    catch(exception: Error, host: ArgumentsHost): any;
}
