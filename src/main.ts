import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { HttpErrorFilter } from './common/filters';
import { MainModule } from './main.module';
import * as session from 'express-session';
require('dotenv').config();

const port = process.env.APP_PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(MainModule);
  app.useGlobalFilters(new HttpErrorFilter(new Logger()));
  app.useGlobalPipes(new ValidationPipe({whitelist: true, forbidNonWhitelisted: true, transform: true}));
  
  app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false, 
    saveUninitialized: false,
    cookie: {secure: false}
  }))
  await app.listen(port, () => console.log(`This server is started on ${port}`));
}
bootstrap();
