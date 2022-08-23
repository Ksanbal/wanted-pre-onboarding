import { UserEntity } from '../../api/user/entities/user.entity';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { CompanyEntity } from '../../api/company/entities/company.entity';
import { JobEntity } from '../../api/job/entities/job.entity';

export class UserCreateSeed implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(UserEntity)
      .values([{ id: 1, name: 'dev.ksanbal' }])
      .execute();

    await connection
      .createQueryBuilder()
      .insert()
      .into(CompanyEntity)
      .values([
        { id: 1, name: '원티드', country: '한국', region: '서울' },
        { id: 2, name: '카카오', country: '한국', region: '판교' },
      ])
      .execute();

    await connection
      .createQueryBuilder()
      .insert()
      .into(JobEntity)
      .values([
        {
          id: 1,
          company: { id: 1, name: '원티드', country: '한국', region: '서울' },
          recruitPosition: '백엔드 주니어 개발자',
          recruitBonus: 500000,
          content:
            '원티드랩에서 백엔드 주니어 개발자를 채용합니다. 자격요건은..',
          techStack: 'NodeJS',
        },
        {
          id: 2,
          company: { id: 1, name: '원티드', country: '한국', region: '서울' },
          recruitPosition: '프론트엔드 주니어 개발자',
          recruitBonus: 500000,
          content:
            '원티드랩에서 프론트엔드 주니어 개발자를 채용합니다. 자격요건은..',
          techStack: 'ReactJS',
        },
        {
          id: 3,
          company: { id: 2, name: '카카오', country: '한국', region: '판교' },
          recruitPosition: '백엔드 주니어 개발자',
          recruitBonus: 1000000,
          content: '카카오에서 백엔드 주니어 개발자를 채용합니다. 자격요건은..',
          techStack: 'Spring',
        },
      ])
      .execute();
  }
}
