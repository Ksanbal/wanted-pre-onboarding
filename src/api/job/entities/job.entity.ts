import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { CompanyEntity } from 'src/api/company/entities/company.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'JOB',
})
export class JobEntity extends BaseEntity {
  @ApiProperty({
    example: '1',
    description: '채용공고 id',
    required: false,
  })
  @IsNumber()
  @PrimaryGeneratedColumn('increment')
  id: number;

  // @IsNumber()
  // @Column({ type: 'int', comment: '기업 id', nullable: false })
  @ManyToOne(() => CompanyEntity, (company: CompanyEntity) => company.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'companyId',
    referencedColumnName: 'id',
  })
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
