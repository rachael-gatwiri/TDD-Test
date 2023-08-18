import v4 from 'uuid/v4';
import { sqlConfig } from '../Config/config';
import mssql from 'mssql';
import { createstudentsTable } from  '../Controllers/studentsfees.controllers';



const createstudentsTable = async(req, res)=>{
    try{
        const id = v4()
        const {name, class, schoolfees} = req.body
        
        const pool = await mssql.connect(sqlConfig)

        if(pool.connected){
            const result = await pool.request()
            .input('id', mssql.VarChar, id)
            .input('name', mssql.VarChar, name)
            .input('class', mssql.VarChar, class)
            .input('schoolfees', mssql.Int, schoolfees)
            .execute('createstudentsTablePROC')

            if(result.rowsAffected == 1){
                return res.json({
                    message: 'student created successfully'
                })
            }else{
                return res.json({
                    message: 'studentcreation failed'
                })
            }
        }
    } catch(error){
        return res.json({error})
    }
}

const getstudents = async(req, res)=>{
    try{
        const pool = await mssql.connect(sqlConfig)

        const allstudents = (await pool.request().execute('getstudentsPROC')).recordset

        return res.status(200).json({students: allstudents})
    } catch(error){
        return res.json({error})
    }
}

const getOnestudent = async(req, res)=>{
    try{
        const {id} = req.params

        const pool = await mssql.connect(sqlConfig)

        const students = (await pool.request().input('id', id).execute('getOnestudentsPROC')).recordset

        return res.status(200).json({students: students})
    }
}

const updatefees = async(req, res)=>{
    try{
        const {id} = req.params

        const {schoolfees} = req.body

        const pool = await mssql.connect(sqlConfig)

        const result = (await pool.request()
        .input('id', mssql.VarChar, id)
        .input('schoolfees', mssql.Int, schoolfees)
        .execute('updatefeesPROC'));

        if(result.rowsAffected == 1){
            res.status(200).json({
                message: 'fees updated successfully'
            })
        }else{
            res.status(400).json({
                message: 'fees not found'
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

module.exports = {
    createstudentsTable,
    getstudents,
    getOnestudent,
    updatefees,
    deletestudent
}

