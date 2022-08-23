import { ApplyEntity } from './../apply/entities/apply.entity';
import { UserEntity } from './../user/entities/user.entity';
import { JobPatchDto } from './dtos/job-patch.dto';
import { CompanyEntity } from './../company/entities/company.entity';
import { JobDto } from './dtos/job.dto';
import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Not, Repository } from 'typeorm';
import { JobListDto } from './dtos/job-list.dto';
import { JobEntity } from './entities/job.entity';
import { JobCreateDto } from './dtos/job-create.dto';
import { JobApplyDto } from './dtos/job-apply.dto';
import { JobListQueryDto } from './dtos/job-list-query.dto';

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(JobEntity)
    private readonly jobRepository: Repository<JobEntity>,
    @InjectRepository(CompanyEntity)
    private readonly companyRepository: Repository<CompanyEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(ApplyEntity)
    private readonly applyRepository: Repository<ApplyEntity>,
  ) {}

  async create(createDto: JobCreateDto) {
    // [x] company 찾기
    const { companyId } = createDto;

    const company = await this.companyRepository.find({
      where: { id: companyId },
    });
    if (company.length < 1) {
      throw new HttpException('Not found', 404);
    }

    const newJob = JobEntity.create(createDto);
    newJob.company = company[0];
    await this.jobRepository.save(newJob);
  }

  async getList(query: JobListQueryDto) {
    const { search } = query;

    let jobs;
    if (search === undefined) {
      jobs = await this.jobRepository.find({
        relations: ['company'],
      });
    } else {
      jobs = await this.jobRepository.find({
        where: [
          {
            company: [
              {
                name: Like(`%${search}%`),
              },
              {
                region: Like(`%${search}%`),
              },
              {
                country: Like(`%${search}%`),
              },
            ],
          },
          {
            recruitPosition: Like(`%${search}%`),
          },
          {
            techStack: Like(`%${search}%`),
          },
        ],
        relations: ['company'],
      });
    }

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

    // [x] 회사가 올린 다른 채용공고
    const companyJobs = await this.jobRepository.find({
      select: ['id'],
      where: {
        id: Not(id),
        company: { id: job[0].company.id },
      },
    });

    const result = new JobDto(job[0]);
    result.otherJobs = companyJobs.map((cjob) => {
      return cjob.id;
    });
    return result;
  }

  async patchOne(id: number, patchDto: JobPatchDto) {
    const jobCount = await this.jobRepository.count({
      where: {
        id,
      },
    });

    if (jobCount < 1) {
      throw new HttpException('Not found', 404);
    }

    await this.jobRepository.update({ id }, patchDto);
  }

  async deleteOne(id: number) {
    const jobCount = await this.jobRepository.count({
      where: {
        id,
      },
    });

    if (jobCount < 1) {
      throw new HttpException('Not found', 404);
    }

    await this.jobRepository.delete({ id });
  }

  async apply(id: number, applyDto: JobApplyDto) {
    const job = await this.jobRepository.find({
      where: {
        id,
      },
    });
    if (job.length < 1) {
      throw new HttpException('Not found', 404);
    }

    // [x] user 정보 가져오기
    const { userId } = applyDto;
    const user = await this.userRepository.find({
      where: {
        id: userId,
      },
    });
    if (user.length < 1) {
      throw new HttpException('Not found', 404);
    }

    // [] 이미 지원한 적 있는지 체크
    const applyCount = await this.applyRepository.count({
      where: {
        job: { id: id },
        user: { id: userId },
      },
    });
    if (applyCount > 0) throw new HttpException('이미 지원하였습니다', 202);

    const newApply = new ApplyEntity();
    newApply.job = job[0];
    newApply.user = user[0];

    await this.applyRepository.save(newApply);
  }
}
