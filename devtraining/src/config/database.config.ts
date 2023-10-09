import { registerAs } from "@nestjs/config";

export default registerAs('database', () => ({
    type: 'mysql',
    host: `${process.env.DB_HOST}`,
    port: `${process.env.DB_PORT}`,
    username: `${process.env.DB_USER}`,
    password: `${process.env.DB_PASSWORD}`,
    database: `${process.env.DB_NAME}`,
    autoLoadEntities: true,
    synchronize: false,
    logging: true,
    migrations: [`${__dirname}/../../db/migrations/*.{js,ts}`],
    migrationsTableName: 'migrations'
}))
