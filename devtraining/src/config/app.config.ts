import { registerAs } from '@nestjs/config'
export default registerAs('config', () => ({
    port: parseInt(process.env.DB_PORT as string, 10) || 3306,
}))
