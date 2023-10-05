import { PartialType } from '@nestjs/mapped-types';
import { CreateCourseDto } from '../create-course.dto/create-course.dto';

// partial type informa que podemos atualizar somente alguns dos membros de CreateCourseDto
export class UpdateCourseDto extends PartialType(CreateCourseDto) {}
