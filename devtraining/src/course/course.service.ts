import { Injectable } from '@nestjs/common';
import { Course } from 'src/courses/entities/course.entity';

@Injectable()
export class CourseService {
  private courses: Course[] = [
    {
      id: 1,
      name: 'NodeJS',
      description: 'NodeJS description',
      tags: ['NodeJS', 'JavaScript'],
    },
  ];
  findAll(): Course[] {
    return this.courses;
  }
  findOne(id: string) {
    return this.courses.find((course) => course.id === +id);
  }
  create(course: any) {
    this.courses.push(course);
  }
  update(id: string, updatedCourseDto: any) {
    // search for the course
    const courseIndex = this.courses.findIndex((course) => course.id === +id);
    // update
    this.courses[courseIndex] = updatedCourseDto;
  }
  remove(id: string) {
    const indexCourse = this.courses.findIndex((course) => course.id === +id);
    if (indexCourse >= 0) {
      this.courses.splice(indexCourse, 1); // delete one course in the position indexCourse
    }
  }
}
