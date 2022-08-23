import { JobEntity } from './../entities/job.entity';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class JobPatchDto extends PickType(JobEntity, [
  'recruitPosition',
  'recruitBonus',
  'content',
  'techStack',
]) {
  @IsString()
  @IsOptional()
  recruitPosition: string;

  @ApiProperty({
    example: 1500000,
  })
  @IsNumber()
  @IsOptional()
  recruitBonus: number;

  @IsString()
  @IsOptional()
  content: string;

  @ApiProperty({
    example: 'Django',
  })
  @IsString()
  @IsOptional()
  techStack: string;
}
