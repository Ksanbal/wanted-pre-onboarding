import { ApplyEntity } from './../apply/entities/apply.entity';
import { UserEntity } from './../user/entities/user.entity';
import { JobPatchDto } from './dtos/job-patch.dto';
import { CompanyEntity } from './../company/entities/company.entity';
import { JobDto } from './dtos/job.dto';
import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobListDto } from './dtos/job-list.dto';
import { JobEntity } from './entities/job.entity';
import { JobCreateDto } from './dtos/job-create.dto';
import { JobApplyDto } from './dtos/job-apply.dto';

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
    const [job, len] = await this.jobRepository.findAndCount({
      where: {
        id,
      },
      relations: ['company'],
    });

    if (len < 1) {
      throw new HttpException('Not found', 404);
    }

    return new JobDto(job[0]);
  }

  async patchOne(id: number, patchDto: JobPatchDto) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, len] = await this.jobRepository.findAndCount({
      where: {
        id,
      },
    });

    if (len < 1) {
      throw new HttpException('Not found', 404);
    }

    await this.jobRepository.update({ id }, patchDto);
  }

  async deleteOne(id: number) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, len] = await this.jobRepository.findAndCount({
      where: {
        id,
      },
    });

    if (len < 1) {
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
