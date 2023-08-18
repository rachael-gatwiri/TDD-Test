
const {Router} = require('express');
const { createstudentsTable, getStudents, getOneStudent, updateStudent, deleteStudent } = require('../Controllers/studentsfees.controllers');

const studentrouter = Router();

studentrouter.post('/', createstudentsTable);
studentrouter.get('/', getStudents);
studentrouter.get('/:id', getOneStudent);
studentrouter.put('/:id', updateStudent);
studentrouter.delete('/:id', deleteStudent);

module.exports = {
    studentrouter
}
