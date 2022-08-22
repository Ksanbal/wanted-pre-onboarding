import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const typeOrmAsyncModuleOptions = {
  useFactory: async (): Promise<TypeOrmModuleOptions> => ({
    namingStrategy: new SnakeNamingStrategy(),
    type: 'sqlite',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    database: 'wanted_pre_onboarding.db',
    synchronize: true, //! set 'false' in production
    autoLoadEntities: true,
    logging: true,
  }),
};

// Seeding을 위한 설정
export const typeOrmModuleOptions = {
  namingStrategy: new SnakeNamingStrategy(),
  type: 'sqlite',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  database: 'wanted_pre_onboarding.db',
  synchronize: true, //! set 'false' in production
  autoLoadEntities: true,
  logging: true,
};
