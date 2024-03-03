import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

export class DBQuery {
    constructor(private dbConn: any) {
        this.dbConn = mysql.createPool({
            host: process.env.HOST,
            user: process.env.DB_USER,
            password: process.env.PASSWORD,
            database: process.env.DATABASE,
        }).promise();
    }
    public async call (query: string) {
        try {
            console.log('Trying to open a DB connection');
            const res = await this.dbConn.query(query).then((res: Object[]) => res[0]);
            return res;
        } catch (error) {
            console.log('The connection or the SQL query failed', error);
        }
        finally {
            this.dbConn.end();
            console.log('DB connection is close');
        }
    }
    public insert<T>(table: string, insertObj: T) {
        const query = `INSERT INTO ${table} SET ` + this.dbConn.escape(insertObj);
        this.call(query);
    }
};
