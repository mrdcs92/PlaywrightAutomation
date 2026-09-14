import mysql, { Pool, RowDataPacket, ExecuteValues } from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export class DatabaseUtils {

    private static pool: Pool | undefined;

    static getPool(): Pool {

        if (!this.pool) {
            this.pool = mysql.createPool({
                host: process.env.DB_HOST,
                port: Number(process.env.DB_PORT ?? 3306),
                user: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,

                waitForConnections: true,
                connectionLimit: 10,
                queueLimit: 0
            });
        }
        return this.pool;
    }

    static async query<T extends RowDataPacket[]>(sql: string, params: ExecuteValues = []): Promise<T> {
        const [rows] = await this.getPool().execute<T>(sql, params);
        return rows;
    }

    static async closePool(): Promise<void> {
        if (this.pool) {
            await this.pool.end();
            this.pool = undefined;
        }
    }
}