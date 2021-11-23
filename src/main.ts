import { NestFactory } from '@nestjs/core';
import { MainModule } from './main.module';
require('dotenv').config();

const port = process.env.APP_PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(MainModule);
  await app.listen(port, () => console.log(`This server is started on ${port}`));
}
bootstrap();
