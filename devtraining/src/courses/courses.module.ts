import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { CourseService } from 'src/course/course.service';

@Module({
    controllers: [CoursesController],
    providers: [CourseService],
})
export class CoursesModule {}
