import { Injectable, NestMiddleware, Logger } from '@nestjs/common';

import { Request, Response, NextFunction } from 'express';

@Injectable()
export class HTTPLogger implements NestMiddleware {
  private logger = new Logger('HTTPLogger');

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method } = request;
    const userAgent = request.get('user-agent') || '';

    let send = response.send;
    response.send = (body) => {
      
      if (body !== undefined && typeof body === 'object' && body.errorName) {
        response.send = send;
        return response.send(body);
      }
      if (body === undefined) {
        body = {body: undefined};
      }
      const { statusCode } = response;
      const {buffer , ...bodyWithoutBuffer} = body;
      this.logger.log(
        `${method} ${
          request.url
        } Status code: ${statusCode} - User agent: ${userAgent} IP: ${ip} \n Request body: ${JSON.stringify(
          request.body,
        )} Query: ${JSON.stringify(request.query)} Params: ${JSON.stringify(
          request.params,
        )} ${`\n Response body: ${bodyWithoutBuffer}`}`,
      );
      response.send = send;
      return response.send(body);
    };
    next();
  }
}
