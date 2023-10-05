import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CourseService } from 'src/course/course.service';
import { CreateCourseDto } from './dto/create-course.dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto/update-course.dto';

@Controller('courses')
export class CoursesController {
  constructor(private coursesService: CourseService) {}
  @Get('list')
  findAll() {
      this.coursesService.findAll()  
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
      this.coursesService.findOne(id);
  }

  @Post()
  create(@Body() createCourseDto: CreateCourseDto) {
    this.coursesService.create(createCourseDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
      this.coursesService.update(id, updateCourseDto);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
      this.coursesService.remove(id);
  }
}
