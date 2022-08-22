import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { ApplyEntity } from '../../apply/entities/apply.entity';
import { CompanyEntity } from '../../company/entities/company.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
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

  @ManyToOne(() => CompanyEntity, (company: CompanyEntity) => company.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'company_id',
    referencedColumnName: 'id',
  })
  company: CompanyEntity;

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

  @OneToMany(() => ApplyEntity, (apply: ApplyEntity) => apply.job, {
    cascade: true,
  })
  applies: ApplyEntity[];
}
