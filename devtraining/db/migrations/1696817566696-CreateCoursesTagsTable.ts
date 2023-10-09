import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateCoursesTagsTable1696817566696 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'courses_tags',
            columns: [
                {
                    name: 'id',
                    type: 'CHAR(36)',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'UUID()'
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP'
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('courses_tags')
    }

}
