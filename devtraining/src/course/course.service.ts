import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCourseDto } from 'src/courses/dto/create-course.dto/create-course.dto';
import { UpdateCourseDto } from 'src/courses/dto/update-course.dto/update-course.dto';
import { Course } from 'src/courses/entities/course.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  findAll() {
    return this.courseRepository.find();
  }
  findOne(id: string) {
    const course = this.courseRepository.findOneBy({ id: +id });
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    return course;
  }
  // sem necessidade de usar asunc por causa do return direto na função de save
  create(courseDto: CreateCourseDto) {
    const course = this.courseRepository.create(courseDto);
    return this.courseRepository.save(course);
  }
  // aqui vamos usar o async para mostrar a outra forma de se criar esse request
  async update(id: string, updatedCourseDto: UpdateCourseDto) {
    const course = await this.courseRepository.preload({
      id: +id,
      ...updatedCourseDto,
    });
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    return this.courseRepository.save(course);
  }
  async remove(id: string) {
    const course = await this.courseRepository.findOneBy({ id: +id });
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    return this.courseRepository.remove(course);
  }
}
