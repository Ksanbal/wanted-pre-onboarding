import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApplyEntity } from 'src/api/apply/entities/apply.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'USER',
})
export class UserEntity extends BaseEntity {
  @ApiProperty({
    example: '1',
    description: 'user id',
    required: false,
  })
  @IsNumber()
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty({
    example: 'ksanbal',
    description: '사용자명',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Column({ type: 'varchar', comment: '사용자명', nullable: false })
  name: string;

  @OneToMany(() => ApplyEntity, (apply: ApplyEntity) => apply.user, {
    cascade: true,
  })
  applies: ApplyEntity[];
}
