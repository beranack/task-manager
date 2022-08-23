import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './transform.interceptor';


async function bootstrap() {
  const logger = new Logger('PortHandler');
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor);
  // validation pipe for class-validator
  const port = 3000;
  await app.listen(port);
  logger.log(`We are Running On Port '${port}'`)
}
bootstrap();
