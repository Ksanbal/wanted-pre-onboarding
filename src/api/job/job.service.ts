import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobDto } from './dtos/job.dto';
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
      return new JobDto(job);
    });

    // console.log(result);
    // return result;
  }
}
