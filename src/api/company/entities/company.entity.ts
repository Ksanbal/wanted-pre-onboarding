import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { JobEntity } from '../../job/entities/job.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'COMPANY',
})
export class CompanyEntity extends BaseEntity {
  @ApiProperty({
    example: '1',
    description: '기업 id',
    required: false,
  })
  @IsNumber()
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty({
    example: '원티드',
    description: '기업명',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Column({ type: 'varchar', comment: '기업명', nullable: false })
  name: string;

  @ApiProperty({
    example: '대한민국',
    description: '국가',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Column({ type: 'varchar', comment: '국가', nullable: false })
  country: string;

  @ApiProperty({
    example: '서울',
    description: '지역',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Column({ type: 'varchar', comment: '지역', nullable: false })
  region: string;

  @OneToMany(() => JobEntity, (job: JobEntity) => job.company, {
    cascade: true,
  })
  jobs: JobEntity[];
}
