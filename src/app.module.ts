import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmAsyncModuleOptions } from './config/typeorm.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { UserModule } from './api/user/user.module';
import { CompanyModule } from './api/company/company.module';
import { ApplyModule } from './api/apply/apply.module';
import { JobModule } from './api/job/job.module';

@Module({
  imports: [
    // TypeORM
    TypeOrmModule.forRootAsync(typeOrmAsyncModuleOptions),
    UserModule,
    CompanyModule,
    ApplyModule,
    JobModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  // log middleware 적용
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
