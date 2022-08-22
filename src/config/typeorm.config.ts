import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { CompanyEntity } from 'src/api/company/entities/company.entity';
import { JobsEntity } from 'src/api/jobs/entities/jobs.entity';
import { UserEntity } from 'src/api/user/entities/user.entity';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const typeOrmModuleOptions = {
  useFactory: async (): Promise<TypeOrmModuleOptions> => ({
    namingStrategy: new SnakeNamingStrategy(),
    type: 'sqlite',
    entities: [UserEntity, CompanyEntity, JobsEntity],
    database: 'wanted_pre_onboarding.db',
    synchronize: true, //! set 'false' in production
    autoLoadEntities: true,
    logging: true,
    keepConnectionAlive: true,
  }),
};
