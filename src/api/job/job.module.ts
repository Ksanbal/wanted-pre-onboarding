import { ApplyEntity } from './../apply/entities/apply.entity';
import { UserEntity } from './../user/entities/user.entity';
import { CompanyEntity } from './../company/entities/company.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { JobController } from './job.controller';
import { JobService } from './job.service';
import { JobEntity } from './entities/job.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      JobEntity,
      CompanyEntity,
      UserEntity,
      ApplyEntity,
    ]),
  ],
  controllers: [JobController],
  providers: [JobService],
})
export class JobModule {}
