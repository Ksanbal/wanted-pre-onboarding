import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class JobApplyDto {
  @ApiProperty({
    example: '1',
    description: 'user id',
    required: true,
  })
  @IsNumber()
  userId: number;
}
