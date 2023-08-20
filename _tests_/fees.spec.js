import mssql from 'mssql';
import { createStudent, getstudents, getOnestudent, updatefees, deletestudent } from '../Controllers/studentsfees.controllers.js';

describe('adding student details', () => {
    it('should add a student', async () => {
        const req = {
            body: {
                id: 1,
                name: 'John Doe',
                grade: '10th',
                fees: 50000
            }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        jest.spyOn(mssql, "connect").mockResolvedValueOnce({
            request: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValueOnce({
                rowsAffected: 4 
            })
        });

        await createStudent(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        // expect(res.json).toHaveBeenCalledWith({
        //     message: 'Student added successfully'
        // });
    });

    it('should return error if student creation fails', async () => {
        const req = {
            body: {
                id: 1,
                name: 'John Doe',
                grade: '10th',
                fees: 50000
            }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        jest.spyOn(mssql, "connect").mockResolvedValueOnce({
            request: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValueOnce({
                rowsAffected: 0 
            })
        });

        await createStudent(req, res);

        expect(res.json).toHaveBeenCalledWith({
            message: 'student creation failed'
        });
    });
});


describe('getting all students', () => {
    it('should return all students', async () => {
        const req = {};

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        const mockStudents = [
            {
                id: 1,
                name: 'John Doe',
                grade: '10th',
                fees: 50000
            },
            {
                id: 2,
                name: 'Jane Doe',
                grade: '11th',
                fees: 60000
            }
        ];

        jest.spyOn(mssql, "connect").mockResolvedValueOnce({
            request: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValueOnce({
                recordset: mockStudents
            })
        });

        await getstudents(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({students: mockStudents});
    });

    it('should return error if student creation fails', async () => {
        const req = {};

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        jest.spyOn(mssql, "connect").mockRejectedValueOnce('error');

        await getstudents(req, res);

        expect(res.json).toHaveBeenCalledWith({error: 'error'});
    })
})

describe('getting one student', () => {
    it('should return one student', async () => {
        const req = {
            params: {
                id: 1
            }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        const mockStudent = {
            id: 1,
            name: 'John Doe',
            grade: '10th',
            fees: 50000
        };

        jest.spyOn(mssql, "connect").mockResolvedValueOnce({
            request: jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValueOnce({
                recordset: [mockStudent]
            })
        });

        await getOnestudent(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({students: [mockStudent]});
    });

    it('should return an error if the id is not found', async () => {
        const req = {
            params: {
                id: 1
            }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        jest.spyOn(mssql, "connect").mockResolvedValueOnce({
            request: jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValueOnce({
                recordset: []
            })
        });

        await getOnestudent(req, res);

        expect(res.json).toHaveBeenCalledWith({message: 'student not found'});
    })
})

describe('updating student fees', () => {
    it('should update student fees', async () => {
        const req = {
            body: {
                id: 1,
                fees: 60000
            }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        jest.spyOn(mssql, "connect").mockResolvedValueOnce({
            request: jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValueOnce({
                rowsAffected: 1
            })
        });

        await updatefees(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({message: 'fees updated successfully'});
    })

    it('should return an error if the id is not found', async () => {
        const req = {
            body: {
                id: 100,
                fees: 60000
            }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        jest.spyOn(mssql, "connect").mockResolvedValueOnce({
            request: jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValueOnce({
                rowsAffected: 0
            })
        });

        await updatefees(req, res);

        expect(res.json).toHaveBeenCalledWith({message: 'student not found'});
    })
})

describe('deleting student', () => {
    it ('should delete a student', async () => {
        const req = {
            params: {
                id: 1
            }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        jest.spyOn(mssql, "connect").mockResolvedValueOnce({
            request: jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValueOnce({
                rowsAffected: 1
            })
        });

        await deletestudent(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({message: 'student deleted successfully'});
    })

    it ('should return an error if the id is not found', async () => {
        const req = {
            params: {
                id: 1
            }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        jest.spyOn(mssql, "connect").mockResolvedValueOnce({
            request: jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValueOnce({
                rowsAffected: 0
            })
        });

        await deletestudent(req, res);

        expect(res.json).toHaveBeenCalledWith({message: 'student not found'});
    })
})



