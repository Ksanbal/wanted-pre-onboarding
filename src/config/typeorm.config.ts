import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { CompanyEntity } from 'src/api/company/entities/company.entity';
import { JobEntity } from 'src/api/job/entities/job.entity';
import { UserEntity } from 'src/api/user/entities/user.entity';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const typeOrmModuleOptions = {
  useFactory: async (): Promise<TypeOrmModuleOptions> => ({
    namingStrategy: new SnakeNamingStrategy(),
    type: 'sqlite',
    entities: [UserEntity, CompanyEntity, JobEntity],
    database: 'wanted_pre_onboarding.db',
    synchronize: true, //! set 'false' in production
    autoLoadEntities: true,
    logging: true,
    keepConnectionAlive: true,
  }),
};
