import chai, { expect } from 'chai';
import chaiHTTP from 'chai-http';
import app from '../app';
import dotenv from 'dotenv';
// import request from 'supertest';

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
    // afterEach(done => {
    //     done();
    // })
    it('should register a user each time', done => {
        chai.request(app).post(process.env.BASE_ROUTE + '/auth').send(mockUser)
            .end((err, res) => {
                expect(res.status).to.equal(201);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('data');
                expect(res.body.data).to.be.an('object');
                expect(res.body.data).to.have.property('message');
                expect(res.body.data.message).to.be.a('string');
                expect(res.body.data.message).to.equal('Signed Up');
                expect(res.body.data).to.have.property('newUser');
                expect(res.body.data.newUser).to.have.property('username');
                expect(res.body.data).to.have.property('token');
                expect(res.body.data.token).to.be.a('string');
                done();
            })
    });

    it('should return user already exist 409', done => {
        chai.request(app).post(process.env.BASE_ROUTE + '/auth').send(mockUser)
            .end((err, res) => {
                expect(res.status).to.equal(409);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('data');
                expect(res.body.data).to.be.an('object');
                expect(res.body.data).to.have.property('message');
                expect(res.body.data.message).to.be.a('string');
                expect(res.body.data.message).to.equal('Email already exist')
                done();
            })
    });

})

