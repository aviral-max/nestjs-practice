import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /**
   * Pipe (ValidationPipe):
   * ---------------------
   * Runs before the controller method.
   * It executes the validation rules defined using class-validator.
   *
   * Enabled globally in main.ts using:
   * app.useGlobalPipes(new ValidationPipe());
   *
   * If validation fails, the controller is never called.
   */
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
