import { JobDto } from './dtos/job.dto';
import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobListDto } from './dtos/job-list.dto';
import { JobEntity } from './entities/job.entity';
import { JobCreateDto } from './dtos/job-create.dto';

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(JobEntity)
    private readonly jobRepository: Repository<JobEntity>,
  ) {}

  async getList() {
    const jobs = await this.jobRepository.find({
      relations: ['company'],
    });
    return jobs.map((job) => {
      return new JobListDto(job);
    });
  }

  async getOne(id: number) {
    const job = await this.jobRepository.find({
      where: {
        id,
      },
      relations: ['company'],
    });

    if (job.length < 1) {
      throw new HttpException('Not found', 404);
    }

    return new JobDto(job[0]);
  }
}
