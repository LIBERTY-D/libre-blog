import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MongooseErrorFilter } from './execeptions';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new MongooseErrorFilter())
  app.enableCors()
  await app.listen(5555);
}
bootstrap();
