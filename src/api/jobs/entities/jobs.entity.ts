import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'JOBS',
})
export class JobsEntity extends BaseEntity {
  @ApiProperty({
    example: '1',
    description: '채용공고 id',
    required: false,
  })
  @IsNumber()
  @PrimaryGeneratedColumn('increment')
  id: number;

  @IsNumber()
  @Column({ type: 'int', comment: '기업 id', nullable: false })
  companyId: number;

  @IsString()
  @Column({ type: 'varchar', comment: '채용포지션', nullable: false })
  recruitPosition: string;

  @IsNumber()
  @Column({ type: 'int', comment: '채용 보상금', nullable: false, default: 0 })
  recruitBonus: number;

  @IsString()
  @Column({ type: 'varchar', comment: '채용 내용', nullable: false })
  content: string;

  @IsString()
  @Column({ type: 'varchar', comment: '사용기술', nullable: false })
  techStack: string;
}
