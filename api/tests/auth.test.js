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
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('message');
                expect(res.body.message).to.be.a('string');
                expect(res.body.message).to.equal('Signed Up');
                expect(res.body).to.have.property('newUser');
                expect(res.body.newUser).to.have.property('username');
                expect(res.body).to.have.property('token');
                expect(res.body.token).to.be.a('string');
                done();
            })
    });

    it('should return user already exist 409', done => {
        chai.request(app).post(process.env.BASE_ROUTE + '/auth').send(mockUser)
            .end((err, res) => {
                expect(res.status).to.equal(409);
                expect(res.body).to.be.an('object');
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('message');
                expect(res.body.message).to.be.a('string');
                expect(res.body.message).to.equal('Email already exist')
                done();
            })
    });

    it('should log a user in each time', done => {
        chai.request(app).post(process.env.BASE_ROUTE + '/auth/login').send(mockUser).end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('user');
            expect(res.body.user).to.have.property('id');
            expect(res.body).to.have.property('token');
            expect(res.body).to.have.property('token')
            expect(res.body.token).to.be.a('string');
            done();
        })
    })

    it('should return user not found', done => {
        chai.request(app).post(process.env.BASE_ROUTE + '/auth/login').send({ ...mockUser, email: 'wrong@email.com' }).end((err, res) => {
            expect(res.status).to.equal(404);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.equal('not found');
            done();
        })
    })

})

