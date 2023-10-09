import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCourseDto } from '../courses/dto/create-course.dto/create-course.dto';
import { UpdateCourseDto } from '../courses/dto/update-course.dto/update-course.dto';
import { Course } from '../entities/course.entity';
import { Tag } from '../entities/tag.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,

    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  findAll(): Promise<Course[]> {
    return this.courseRepository.find({
      relations: {
        tags: true,
      },        
    });
  }
  findOne(id: string) {
    const course = this.courseRepository.findOneBy({ id: id });
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    return course;
  }
  // sem necessidade de usar asunc por causa do return direto na função de save
  async create(courseDto: CreateCourseDto) {
      const tags = await Promise.all(courseDto.tags.map((name) => this.preloadTagByName(name)));
      const course = this.courseRepository.create({
        ...courseDto,
        tags,
      })
    return this.courseRepository.save(course);
  }
  // aqui vamos usar o async para mostrar a outra forma de se criar esse request
  async update(id: string, updatedCourseDto: UpdateCourseDto) {
      const tags = updatedCourseDto.tags && (
        await Promise.all(
          updatedCourseDto.tags.map((name) => this.preloadTagByName(name))
        )
      )
    const course = await this.courseRepository.preload({
        id: id,
        ...updatedCourseDto,
        tags,
    });
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    return this.courseRepository.save(course);
  }
  async remove(id: string) {
    const course = await this.courseRepository.findOneBy({ id: id });
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    return this.courseRepository.remove(course);
  }
    
  private async preloadTagByName(name: string): Promise<Tag> {
      const tag = await this.tagRepository.findOneBy({ name });
      if (tag) {
        return tag;        
      } 
      return this.tagRepository.create({ name });
  }
}
