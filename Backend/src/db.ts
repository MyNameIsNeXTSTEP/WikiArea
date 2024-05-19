import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

interface IExistsSingleQuery {
    clmn: string,
    table: string,
    condition?: string
};

export class DBQuery {
    constructor(private dbConn: any) {
        this.dbConn = mysql.createPool({
            host: process.env.HOST,
            user: process.env.DB_USER,
            password: process.env.PASSWORD,
            database: process.env.DATABASE,
        }).promise();
    }
    public async call(query: string) {
        try {
            console.log('Trying to open a DB connection');
            const res = await this.dbConn.query(query).then((res: Object[]) => res[0]);
            res && console.log('DB transaction is complete successefully');
            console.log(res, '__RES__')
            return res;
        } catch (error) {
            console.log('The connection or the SQL query failed', error);
        }
        finally {
            this.dbConn.end();
            console.log('DB connection is closed');
        }
    }
    // @todo: Refactor
    public async singleExists ({ clmn, table, condition = undefined }: IExistsSingleQuery) {
        if (!clmn || !table) console.log(new Error('No column or the table name was provided, check the query instance')); // need throw ?
        const query = `SELECT EXISTS(SELECT ${clmn} FROM ${table}
            ${condition
                ? 'WHERE ' + condition + ')'
                : ')'
            }
        `;
        console.log(query, '__QUERY__');
        return await this.call(query);
    }
    // @todo: Refactor
    public async multiExists(queryConfig: IExistsSingleQuery[]) {
        return queryConfig.forEach(async query => {
            return await this.singleExists(query)
        })
    }
    public async insert<T>(table: string, insertObj: T) {
        const query = `INSERT INTO ${table} SET ` + this.dbConn.escape(insertObj);
        return await this.call(query);
    }
    public async replace<T>(table: string, insertObj: T) {
        const query = `REPLACE INTO ${table} SET ` + this.dbConn.escape(insertObj);
        await this.call(query);
    }
    public async update<T>(table: string, insertObj: T, condition = undefined) {
        const baseQuery = `UPDATE ${table} SET ${this.dbConn.escape(insertObj)}`
        return await this.call(`${baseQuery} ${condition ? 'WHERE ' + condition : ';'}`);
    }
};
