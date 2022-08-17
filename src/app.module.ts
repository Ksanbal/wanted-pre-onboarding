import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmModuleOptions } from './config/typeorm.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    // TypeORM
    TypeOrmModule.forRootAsync(typeOrmModuleOptions),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
