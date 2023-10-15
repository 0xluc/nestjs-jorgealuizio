import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { Tag } from './entities/tag.entity';
import { Course } from './entities/course.entity';
dotenv.config();

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: `${process.env.DB_HOST}`,
        port: Number(`${process.env.DB_PORT}`),
        username: `${process.env.DB_USER}`,
        password: `${process.env.DB_PASSWORD}`,
        database: `${process.env.DB_NAME}`,
        entities: [Tag, Course],
        synchronize: false,
        logging: true,
        migrations: [`${__dirname}/migrations/*{.ts,.js}`],
        migrationsTableName: 'migrations',
      });
      return await dataSource.initialize();
    },
  },
];
