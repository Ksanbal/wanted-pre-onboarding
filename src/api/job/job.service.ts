import { JobPatchDto } from './dtos/job-patch.dto';
import { CompanyEntity } from './../company/entities/company.entity';
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
    @InjectRepository(CompanyEntity)
    private readonly companyRepository: Repository<CompanyEntity>,
  ) {}

  async create(createDto: JobCreateDto) {
    // [] company 찾기
    const { companyId } = createDto;

    const company = await this.companyRepository.find({
      where: { id: companyId },
    });
    if (company.length < 1) {
      throw new HttpException('Not found', 404);
    }

    const newJob = JobEntity.create(createDto);
    newJob.company = company[0];
    console.log(newJob);
    await this.jobRepository.save(newJob);
  }

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

  async patchOne(id: number, patchDto: JobPatchDto) {
    const [_, len] = await this.jobRepository.findAndCount({
      where: {
        id,
      },
      relations: ['company'],
    });

    if (len < 1) {
      throw new HttpException('Not found', 404);
    }

    await this.jobRepository.update({ id }, patchDto);
  }
}
