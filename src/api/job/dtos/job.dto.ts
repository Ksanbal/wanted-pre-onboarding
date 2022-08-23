import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';
import { JobEntity } from '../entities/job.entity';

export class JobDto extends OmitType(JobEntity, ['company']) {
  @ApiProperty({
    example: '원티드랩',
    description: '회사명',
    required: false,
  })
  @IsString()
  companyName: string;

  @ApiProperty({
    example: '한국',
    description: '국가',
    required: false,
  })
  @IsString()
  country: string;

  @ApiProperty({
    example: '서울',
    description: '지역',
    required: false,
  })
  @IsString()
  region: string;

  // [] 회사가 올린 다른 채용공고
  @ApiProperty({
    example: ['채용공고_id', '채용공고_id', '...'],
    description: '회사가 올린 다른 채용공고',
    required: false,
  })
  @IsArray()
  otherJobs: number[];

  constructor(job: JobEntity) {
    super();
    this.id = job.id;
    this.companyName = job.company.name;
    this.country = job.company.country;
    this.region = job.company.region;
    this.recruitPosition = job.recruitPosition;
    this.recruitBonus = job.recruitBonus;
    this.techStack = job.techStack;
    this.content = job.content;
  }
}
