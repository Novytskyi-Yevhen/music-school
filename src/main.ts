import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MainModule } from './main.module';
require('dotenv').config();

const port = process.env.APP_PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(MainModule);

  app.useGlobalPipes(new ValidationPipe({whitelist: true, forbidNonWhitelisted: true, transform: true}));

  await app.listen(port, () => console.log(`This server is started on ${port}`));
}
bootstrap();
