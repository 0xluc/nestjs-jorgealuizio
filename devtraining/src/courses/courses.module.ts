import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { CourseService } from '../../src/course/course.service';
import { DatabaseModule } from 'src/database/database.module';
import { coursesProviders } from './courses.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [CoursesController],
  providers: [...coursesProviders, CourseService],
})
export class CoursesModule {}
