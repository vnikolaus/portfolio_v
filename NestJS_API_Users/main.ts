import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/application/app.module';
import { ValidationPipe } from '@nestjs/common';
import { config } from 'dotenv';
config()

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true
  }))

  const port = +process.env.PORT || 3333
  await app.listen(port, () => {
    console.log(`API online ...\nhttp://localhost:${port}`);
  });
}
bootstrap();
