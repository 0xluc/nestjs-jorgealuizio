import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // passa pro serviço somente o que tem no model
      forbidUnknownValues: true, // retorna um erro caso um campo nao esteja no dto
      transform: true, // faz a tipagem do objeto de acordo com o dto
    }),
  );
  await app.listen(3000);
}
bootstrap();
