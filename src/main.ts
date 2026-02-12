/* eslint-disable @typescript-eslint/no-unsafe-call */
import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { CustomExceptionFilter } from './exceptions/custom-exception.filter';
import { CustomHttpExceptionFilter } from './exceptions/custom-httpexception.filter';
import { AuthGuard } from './guard/auth.guard';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { CustomExceptionDto } from './exceptions/dto/custom-exception.dto';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  const configService = app.get(ConfigService);

  const logger = app.get(Logger);
  app.useGlobalFilters(
    new CustomExceptionFilter(app.get(HttpAdapterHost), logger),
    new CustomHttpExceptionFilter(app.get(HttpAdapterHost), logger),
  );
  app.enableCors();
  app.useGlobalGuards(new AuthGuard());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Sample API example')
    .setDescription('The sample API description')
    .setVersion('1.0')
    .addTag('sample-api')
    .addGlobalResponse({
      status: 500,
      description: 'Internal server error',
      type: CustomExceptionDto,
    })
    .addGlobalResponse({
      status: 403,
      description: 'Forbidden',
      type: CustomExceptionDto,
    })
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, documentFactory);
  SwaggerModule.setup('swagger', app, documentFactory, {
    jsonDocumentUrl: 'swagger/json',
  });

  logger.log('Port: ' + process.env.PORT);

  const port = configService.getOrThrow<number>('port');

  await app.listen(port);
}

bootstrap();
