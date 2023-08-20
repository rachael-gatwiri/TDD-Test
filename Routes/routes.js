import { Router } from 'express';
import { createStudent, getstudents, getOnestudent, updatefees, deletestudent } from '../Controllers/studentsfees.controllers.js';


const studentrouter = Router();

studentrouter.post('/', createStudent);
studentrouter.get('/', getstudents);
studentrouter.get('/:id', getOnestudent);
studentrouter.put('/:id', updatefees);
studentrouter.delete('/:id', deletestudent);


export {
    studentrouter
}
