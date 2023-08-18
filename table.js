import mssql from 'mssql';
import { config } from './Config/config';

const createstudentsTable = async(req, res)=>{
    try {
        const table = `
        BEGIN
        TRY
            CREATE TABLE studentsTable(
                id VARCHAR(200) PRIMARY KEY,
                name VARCHAR(200) NOT NULL,
                class VARCHAR(200) NOT NULL,
                schoolfees INT NOT NULL,
            )
            END TRY
            BEGIN
            CATCH
                THROW 50001, 'Table already Exists!', 1;
                END CATCH`;

    const pool = await mssql.connect(config)
    await pool.request().query(table, (err)=>{
        if(err instanceof mssql.RequestError){
            console.log({Error: err.message});
        }else{
            console.log('Table created Successfully');
        }
    })
    } catch (error) {
        return ({Error: error})
    }
}

module.exports = { createstudentsTable }
