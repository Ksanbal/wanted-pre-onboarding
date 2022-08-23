import { JobDto } from './dtos/job.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobListDto } from './dtos/job-list.dto';
import { JobEntity } from './entities/job.entity';

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
    const job = await this.jobRepository.findOne({
      where: {
        id,
      },
      relations: ['company'],
    });
    return new JobDto(job);
  }
}
