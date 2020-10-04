import chai, { expect } from 'chai';
import chaiHTTP from 'chai-http';
import app from '../app';
import dotenv from 'dotenv';

chai.use(chaiHTTP);
dotenv.config();

const mockUser = {
    firstName: 'firstName',
    lastName: 'lastName',
    username: 'username',
    password: 'password',
    date_of_birth: '12-12-2020'
}

describe('Testing auth routes', () => {
    afterEach(done => {
        done();
    })
    it('should send working from AUTH', done => {
        chai.request(app).post(process.env.BASE_ROUTE+'/auth').send(mockUser).end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('data');
            done();
        })
    })

})

