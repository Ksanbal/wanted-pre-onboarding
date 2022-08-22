import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { JobEntity } from 'src/api/job/entities/job.entity';
import { UserEntity } from 'src/api/user/entities/user.entity';
import {
  BaseEntity,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'APPLY',
})
export class ApplyEntity extends BaseEntity {
  @ApiProperty({
    example: '1',
    description: '채용공고 id',
    required: false,
  })
  @IsNumber()
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => JobEntity, (job: JobEntity) => job.applies, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'job_id',
    referencedColumnName: 'id',
  })
  job: JobEntity;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.applies, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  user: UserEntity;
}
