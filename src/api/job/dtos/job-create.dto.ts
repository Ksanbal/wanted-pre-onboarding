import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { JobEntity } from '../entities/job.entity';

export class JobCreateDto extends OmitType(JobEntity, ['id', 'company']) {
  @ApiProperty({
    example: 1,
    description: '회사_id',
    required: true,
  })
  @IsNumber()
  companyId: number;
}
