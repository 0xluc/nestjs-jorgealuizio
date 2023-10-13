import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { CoursesModule } from '../../courses/courses.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateCourseDto } from '../../../src/courses/dto/create-course.dto/create-course.dto';

describe('Course: /courses', () => {
  let app: INestApplication;

  const course:CreateCourseDto = {
    name: 'Curso de NestJS',
    description: 'Curso de NestJS',
    tags: ['NestJS', 'TypeORM']
  }

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        CoursesModule,
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: 'localhost',
          port: 5433,
          username: 'root',
          password: '',
          database: 'devtrainingtest',
          autoLoadEntities: true,
          synchronize: true,
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // passa pro serviço somente o que tem no model
      forbidUnknownValues: true, // retorna um erro caso um campo nao esteja no dto
      transform: true, // faz a tipagem do objeto de acordo com o dto
    }));
    await app.init();
  });
  afterAll(async () => {
    await app.close();
  });
  it('Create POST /courses', async () => {
    return request(app.getHttpServer())
      .post('/courses')
      .send(course)
      .expect(HttpStatus.CREATED)
      .then(({ body }) => {
          const expectedCourse = jasmine.objectContaining({
              ...course,
              tags: jasmine.arrayContaining(
                  course.tags.map((tag) => jasmine.objectContaining({ name: tag })))
          });

      expect(body).toEqual(expectedCourse);
      })
  });
});
