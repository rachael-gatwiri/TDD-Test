
import { expect } from 'chai';
import request from 'supertest';
import app from '../server.js';

describe('adding student details', () => {
    it('should add a student with the details including name, class, fee balance', async () => {
        const res = await request(app)
            
        expect(res.statusCode).equal(201);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message');
        expect(res.body.message).equal('Student added successfully');
    });

    it('should return an error if name is not provided', async () => {
        const res = await request(app)
            .post('/student')
            .send({
                class: 'JSS 1',
                feeBalance: 50000
            });
        expect(res.statusCode).equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error');
        expect(res.body.error).equal('Name is required');
    })

    it('should return an error if class is not provided', async () => {
        const res = await request(app)
            .post('/student')
            .send({
                name: 'John Doe',
                feeBalance: 50000
            });
        expect(res.statusCode).equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error');
        expect(res.body.error).equal('Class is required');
    })

    it('should return an error if feeBalance is not provided', async () => {
        const res = await request(app)
            .post('/student')
            .send({
                name: 'John Doe',
                class: 'JSS 1',
            });
        expect(res.statusCode).equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error');
        expect(res.body.error).equal('Fee balance is required');
    })

    it('should return an error if feeBalance is not a number', async () => {
        const res = await request(app)
            .post('/student')
            .send({
                name: 'John Doe',
                class: 'JSS 1',
                feeBalance: '50000'
            });
        expect(res.statusCode).equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error');
        expect(res.body.error).equal('Fee balance must be a number');
    })
});

describe('updating fee balance', () => {
    it('should update the fee balance of a student', async () => {
        const res = await request(app)
            .patch('/student/1')
            .send({
                feeBalance: 10000
            });
        expect(res.statusCode).equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message');
        expect(res.body.message).equal('Fee balance updated successfully');
    })

    it('should return an error if feeBalance is not provided', async () => {
        const res = await request(app)
            .patch('/student/1')
            .send({});
        expect(res.statusCode).equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error');
        expect(res.body.error).equal('Fee balance is required');
    })

    it('should return an error if feeBalance is not a number', async () => {
        const res = await request(app)
            .patch('/student/1')
            .send({
                feeBalance: '10000'
            });
        expect(res.statusCode).equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error');
        expect(res.body.error).equal('Fee balance must be a number');
    })

    it('should return an error if student is not found', async () => {
        const res = await request(app)
            .patch('/student/10')
            .send({
                feeBalance: 10000
            });
        expect(res.statusCode).equal(404);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error');
        expect(res.body.error).equal('Student not found');
    });
})

describe('soft delete a student', () => {
    it('should soft delete a student', async () => {
        const res = await request(app)
            .delete('/student/1');
        expect(res.statusCode).equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message');
        expect(res.body.message).equal('Student deleted successfully');
    });

    it('should return an error if student is not found', async () => {
        const res = await request(app)
            .delete('/student/10');
        expect(res.statusCode).equal(404);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error');
        expect(res.body.error).equal('Student not found');
    });
})