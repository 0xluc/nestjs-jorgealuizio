import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { CourseService } from 'src/course/course.service';

@Controller('courses')
export class CoursesController {
  constructor(private coursesService: CourseService) {}
  @Get('list')
  findAll(@Res() response) {
    return response.status(200).send('Listagem de cursos');
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `Curso #${id}`;
  }

  @Post()
  @HttpCode(HttpStatus.NO_CONTENT)
  create(@Body() body: any) {
    return body;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body('name') body: any) {
    return `Curso #${id} alterado para ${body}`;
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return `Curso #${id} removido`;
  }
}
