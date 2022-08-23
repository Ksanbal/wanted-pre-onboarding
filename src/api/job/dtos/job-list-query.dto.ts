import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class JobListQueryDto {
  @ApiProperty({
    description: '검색어 (회사명, 국가, 지역, 채용포지션, 기술스택)',
    required: false,
  })
  @IsString()
  @IsOptional()
  search: string;
}
