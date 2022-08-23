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

  @ApiProperty({
    example: {
      id: 1,
      name: '원티드',
      country: 'Korea',
      region: 'Seoul',
    },
    description: '회사 id',
    required: true,
  })
  @ManyToOne(() => CompanyEntity, (company: CompanyEntity) => company.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'company_id',
    referencedColumnName: 'id',
  })
  company: CompanyEntity;

  @ApiProperty({
    example: '데브옵스 주니어 개발자',
    description: '채용 포지션',
    required: true,
  })
  @IsString()
  @Column({ type: 'varchar', comment: '채용포지션', nullable: false })
  recruitPosition: string;

  @ApiProperty({
    example: 600000,
    description: '채용 보상금',
    required: true,
  })
  @IsNumber()
  @Column({ type: 'int', comment: '채용 보상금', nullable: false, default: 0 })
  recruitBonus: number;

  @ApiProperty({
    example: '원티드랩에서 데브옵스 주니어 개발자를 채용합니다. 자격요건은..',
    description: '채용 내용',
    required: true,
  })
  @IsString()
  @Column({ type: 'varchar', comment: '채용 내용', nullable: false })
  content: string;

  @ApiProperty({
    example: 'Kubernetes',
    description: '사용기술',
    required: true,
  })
  @IsString()
  @Column({ type: 'varchar', comment: '사용기술', nullable: false })
  techStack: string;

  @OneToMany(() => ApplyEntity, (apply: ApplyEntity) => apply.job, {
    cascade: true,
  })
  applies: ApplyEntity[];
}
