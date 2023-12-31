import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddCoursesIdToTagsTable1696818964969
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'courses_tags',
      new TableColumn({
        name: 'coursesId',
        type: 'VARCHAR(36)',
        isNullable: true,
      }),
    );
    await queryRunner.createForeignKey(
      'courses_tags',
      new TableForeignKey({
        name: 'courses_tags_courses',
        columnNames: ['coursesId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'courses',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('courses_tags', 'courses_tags_courses');
    await queryRunner.dropColumn('courses_tags', 'coursesId');
  }
}
