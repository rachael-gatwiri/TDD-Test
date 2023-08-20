import mssql from 'mssql';
import dotenv from 'dotenv';
dotenv.config();

const sqlConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    server: 'localhost',
    options: {
        encrypt: false,
        trustServerCertificate: true
    }

}

export { sqlConfig }