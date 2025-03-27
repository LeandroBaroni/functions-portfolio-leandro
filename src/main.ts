import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app: INestApplication = await NestFactory.create<INestApplication>(AppModule);
  configureSwagger(app);
  configureValidationPipe(app);
  await app.listen(process.env.PORT ?? 3000);
}

function configureSwagger(app: INestApplication) {
  const config: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
    .setTitle('Portfólio Leandro Baroni')
    .setDescription('APIS Portfólio')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const documentOrFactory: OpenAPIObject = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentOrFactory);
}

function configureValidationPipe(app: INestApplication) {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );
}

bootstrap();
