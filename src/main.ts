import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // HttpException Filter
  app.useGlobalFilters(new HttpExceptionFilter());

  // Response Interceptor
  app.useGlobalInterceptors(new ResponseInterceptor());

  // Swagger
  SwaggerModule.setup(
    '/docs',
    app,
    SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle('Wanted Preonboarding')
        .setDescription('원티드 프리온보딩 백엔드코스 4차 선발과제 API docs')
        .setVersion('1.0')
        .setContact(
          'dev.ksanbal',
          'https://devksanbal.site',
          'dev.ksanbal@gmail.com',
        )
        .setLicense(
          'MIT License',
          'https://github.com/Ksanbal/wanted-pre-onboarding/blob/main/LICENSE',
        )
        .build(),
    ),
  );

  await app.listen(3000);
}
bootstrap();
