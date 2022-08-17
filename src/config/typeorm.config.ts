import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const typeOrmModuleOptions = {
  useFactory: async (): Promise<TypeOrmModuleOptions> => ({
    namingStrategy: new SnakeNamingStrategy(),
    type: 'sqlite',
    entities: [],
    database: 'wanted_pre_onboarding.db',
    synchronize: true, //! set 'false' in production
    autoLoadEntities: true,
    logging: true,
    keepConnectionAlive: true,
  }),
};
