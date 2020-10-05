import chai, { expect } from 'chai';
import chaiHTTP from 'chai-http';
import app from '../app';
import dotenv from 'dotenv';
import request from 'supertest';

chai.use(chaiHTTP);
dotenv.config();

const mockUser = {
    username: 'username',
    firstName: 'first name',
    lastName: 'last name',
    email: 'test@gmail.com',
    password: 'password',
    gender: 'male',
    date_of_birth: '12-02-2020'
}

describe('Testing auth routes', () => {
    afterEach(done => {
        done();
    })
    it('should send working from AUTH', done => {
        request(app).post(process.env.BASE_ROUTE + '/auth').send(mockUser).end((err, res) => {
            if (err) return done(err);
            expect(res.status).to.equal(201);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('data');
            expect(res.body.data).to.be.an('object');
            done();
        });
    })

})

