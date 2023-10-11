import { Test, TestingModule } from '@nestjs/testing';
import { CourseService } from './course.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Course } from '../entities/course.entity';
import { Tag } from '../entities/tag.entity';
import { DataSource, Repository } from 'typeorm';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOne: jest.fn(),
  find: jest.fn(),
  save: jest.fn(),
  create: jest.fn(),
  findBy: jest.fn(),
});

describe('CourseService', () => {
  let service: CourseService;
  let courseRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CourseService,
        { provide: DataSource, useValue: {} },
        {
          provide: getRepositoryToken(Course),
          useValue: createMockRepository(),
        },
        { provide: getRepositoryToken(Tag), useValue: createMockRepository() },
      ],
    }).compile();

    service = module.get<CourseService>(CourseService);
    courseRepository = module.get<MockRepository>(getRepositoryToken(Course));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('findOne', () => {
    describe('buscar curso pelo ID', () => {
      it('deve retornar o objeto Course', async () => {
        const courseId = '1';
        const expectCourse = {};
        courseRepository.findOneById.mockReturnValue(expectCourse);
        const course = await service.findOne(courseId);
        expect(course).toEqual(expectCourse);
      });
      it('deve retornar um NotFoundException', async () => {});
    });
  });
});
