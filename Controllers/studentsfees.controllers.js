import {v4} from 'uuid';
import { sqlConfig } from '../Config/config.js';
import mssql from 'mssql';
// import { createstudentsTable} from '../Database/Tables/table';

 const createStudent = async(req, res)=>{
    try{
        const id = v4()
        const {name, grade, fees} = req.body
        
        const pool = await mssql.connect(sqlConfig)

        if(pool.connected){
            const result = await pool.request()
            .input('id', mssql.VarChar, id)
            .input('name', mssql.VarChar, name)
            .input('grade', mssql.VarChar, grade)
            .input('fees', mssql.Int, fees)
            .execute('createstudentsPROC')

            if (result.rowsAffected == 1) {
                return res.status(200).json({
                    message: 'Student added successfully'
                })
            }else{
                return res.json({
                    message: 'student creation failed'
                })
        }
    }
    } catch(error){
        return res.json({error})
    }

}

 const getstudents = async(req, res)=>{
    try{
        const {id} = req.params
        const pool = await mssql.connect(sqlConfig)

        const students = (await pool.request().execute('getstudentsPROC')).recordset

       return res.status(200).json({students})
    } catch(error){
        return res.json({error})
    }
}

 const getOnestudent = async(req, res)=>{
    try{
        const {id} = req.params

        const pool = await mssql.connect(sqlConfig)

        const students = (await pool.request().input('id', id).execute('getOnestudentsPROC')).recordset

       return res.status(200).json({students})

    } catch(error){
        return res.json({error})
    }
}

 const updatefees = async(req, res)=>{
    try{
        const {id} = req.params

        const {schoolfees} = req.body

        const pool = await mssql.connect(sqlConfig)

        const result = (await pool.request()
        .input('id', mssql.VarChar, id)
        .input('fees', mssql.Int, schoolfees)
        .execute('updatefeesPROC'));

        if(result.rowsAffected == 1){
            res.status(200).json({
                message: 'fees updated successfully'
            })
        }else{
            res.status(400).json({
                message: 'student not found'
            })
        }
    }  catch(error){
        return res.json({error})
    }
}

 const deletestudent = async(req, res)=>{
    try{
        const {id} = req.params

        const pool = await mssql.connect(sqlConfig)

        const result = (await pool.request()
        .input('id', mssql.VarChar, id)
        .execute('deletestudentPROC'));

        if(result.rowsAffected == 1){
            res.status(200).json({
                message: 'student deleted successfully'
            })
        }else{
            res.status(400).json({
                message: 'student not found'
            })
        }
    }  catch(error){
        return res.json({error})
    }
}



export {createStudent, getstudents, getOnestudent, updatefees, deletestudent }

