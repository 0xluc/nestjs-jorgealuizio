import { CreateCourseDto } from 'src/courses/dto/create-course.dto/create-course.dto';
import { CourseService } from './course.service';
import { NotFoundException } from '@nestjs/common';
import { UpdateCourseDto } from 'src/courses/dto/update-course.dto/update-course.dto';

describe('CourseService', () => {
  let service: CourseService;
  let id;
  let date;

  beforeEach(async () => {
    service = new CourseService();
    id = '748999a8-c835-49d4-875d-3fb98ad8ae88';
    date = new Date();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a course', async () => {
    const expectedOutputTags = [
      {
        id,
        name: 'Angular',
        created_at: date,
      },
    ];
    const expectedOutputCourse = {
      id,
      name: 'Angular',
      description: 'Test description',
      tags: expectedOutputTags,
      created_at: date,
    };
    const mockCourseRepository = {
      create: jest.fn().mockReturnValue(Promise.resolve(expectedOutputCourse)),
      save: jest.fn().mockReturnValue(Promise.resolve(expectedOutputCourse)),
    };
    const mockTagRepository = {
      create: jest.fn().mockReturnValue(Promise.resolve(expectedOutputTags)),
      findOne: jest.fn(),
    };
    //@ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository;
    //@ts-expect-error defined part of methods
    service['tagRepository'] = mockTagRepository;

    const createCourseDto: CreateCourseDto = {
      name: 'Angular',
      description: 'Test description',
      tags: ['Angular'],
    };
    const newCourse = await service.create(createCourseDto);
    expect(mockCourseRepository.save).toHaveBeenCalled();
  });
  it('should list courses', async () => {
    const expectedOutputTags = [
      {
        id,
        name: 'Angular',
        created_at: date,
      },
    ];
    const expectedOutputCourse = [
      {
        id,
        name: 'Angular',
        description: 'Test description',
        tags: expectedOutputTags,
        created_at: date,
      },
    ];
    const mockCourseRepository = {
      findAll: jest.fn().mockReturnValue(Promise.resolve(expectedOutputCourse)),
      find: jest.fn().mockReturnValue(Promise.resolve(expectedOutputCourse)),
    };
    //@ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository;

    const courses = await service.findAll();
    expect(mockCourseRepository.find).toHaveBeenCalled();
    expect(expectedOutputCourse).toStrictEqual(courses);
  });
  it('should get a course', async () => {
    const expectedOutputTags = [
      {
        id,
        name: 'Angular',
        created_at: date,
      },
    ];
    const expectedOutputCourse = [
      {
        id,
        name: 'Angular',
        description: 'Test description',
        tags: expectedOutputTags,
        created_at: date,
      },
    ];
    const mockCourseRepository = {
      findOne: jest.fn().mockReturnValue(Promise.resolve(expectedOutputCourse)),
    };
    //@ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository;

    const course = await service.findOne(id);
    expect(mockCourseRepository.findOne).toHaveBeenCalled();
    expect(expectedOutputCourse).toStrictEqual(course);
  });
  it('should update a course', async () => {
    const expectedOutputTags = [
      {
        id,
        name: 'Angular',
        created_at: date,
      },
    ];
    const expectedOutputCourse = [
      {
        id,
        name: 'Angular',
        description: 'Test description',
        tags: expectedOutputTags,
        created_at: date,
      },
    ];
    const mockCourseRepository = {
      update: jest.fn().mockReturnValue(Promise.resolve(expectedOutputCourse)),
      save: jest.fn().mockReturnValue(Promise.resolve(expectedOutputCourse)),
      preload: jest.fn().mockReturnValue(Promise.resolve(expectedOutputCourse)),
    };
    const mockTagRepository = {
      create: jest.fn().mockReturnValue(Promise.resolve(expectedOutputCourse)),
      findOne: jest.fn().mockReturnValue(Promise.resolve(expectedOutputCourse)),
    };
    //@ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository;
    //@ts-expect-error defined part of methods
    service['tagRepository'] = mockTagRepository;

    const updateCourseDto: UpdateCourseDto = {
      name: 'Angular',
      description: 'Test description',
      tags: ['Angular'],
    };

    const course = await service.update(id, updateCourseDto);
    expect(mockCourseRepository.save).toHaveBeenCalled();
    expect(expectedOutputCourse).toStrictEqual(course);
  });
  it('should remove a course', async () => {
    const expectedOutputTags = [
      {
        id,
        name: 'Angular',
        created_at: date,
      },
    ];
    const expectedOutputCourse = [
      {
        id,
        name: 'Angular',
        description: 'Test description',
        tags: expectedOutputTags,
        created_at: date,
      },
    ];
    const mockCourseRepository = {
      findOne: jest.fn().mockReturnValue(Promise.resolve(expectedOutputCourse)),
      remove: jest.fn().mockReturnValue(Promise.resolve(expectedOutputCourse)),
    };
    //@ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository;

    const course = await service.remove(id);
    expect(mockCourseRepository.remove).toHaveBeenCalled();
    expect(expectedOutputCourse).toStrictEqual(course);
  });

  //describe('findOne', () => {
  //  describe('buscar curso pelo ID', () => {
  //    it('deve retornar o objeto Course', async () => {
  //      const courseId = '1';
  //      const expectCourse = {};
  //      courseRepository.findOneBy.mockResolvedValue(expectCourse);
  //      const course = await service.findOne(courseId);
  //      expect(course).toEqual(expectCourse);
  //    });
  //    it('deve retornar um NotFoundException', async () => {
  //      const courseId = '1';
  //      courseRepository.findOne.mockResolvedValue(undefined);
  //      try {
  //        await service.findOne(courseId);
  //      } catch (error) {
  //        expect(error).toBeInstanceOf(NotFoundException);
  //        expect(error.message).toEqual(`Course not found`);
  //      }
  //    });
  //  });
  //});
});
