import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('bootstrap');
  const port = process.env.PORT || 3000;
  await app.listen(port);
  logger.log(`Aplicação rodando na porta: ${port}`);
}
bootstrap();
