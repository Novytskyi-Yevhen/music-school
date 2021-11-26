import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
    Logger
  } from '@nestjs/common';
  @Catch()
  export class HttpErrorFilter implements ExceptionFilter {
    constructor(private readonly logger : Logger ){}
    catch(exception: Error, host: ArgumentsHost): any {
      const ctx = host.switchToHttp();
      const request = ctx.getRequest();
      const response = ctx.getResponse();
  
      const statusCode = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR
      const prodMessage = exception instanceof HttpException ?  exception.message : 'Internal server error'
  
      const devErrorResponse: any = {
        statusCode,
        timestamp: new Date().toISOString(),
        path: request.url,
        method: request.method,
        errorName: exception?.name,
        message: exception?.message,
        body: request.body,
        query: request.query
      };
  
      const prodErrorResponse: any = {
        statusCode,
        message: prodMessage
      };
      const {errorName, message, ...devErrorLog} = devErrorResponse;
      this.logger.log( `${JSON.stringify(devErrorLog)} \n ${exception?.stack}` , exception?.name);
      response.status(statusCode).json( process.env.MODE === 'dev'? devErrorResponse: prodErrorResponse);
    }
  }