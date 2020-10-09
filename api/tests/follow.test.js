import chai, { expect } from 'chai';
import chaiHTTP from 'chai-http';
import app from '../app';
import { mockFollow, mockUser } from '../__mock__/_mock_'
import { generateToken } from '../utils/auth.utils';

const token = generateToken(1, mockUser.email);
chai.use(chaiHTTP);

describe('testing follow and unfollow routes', () => {
    

    it('should follow a user each time', done => {
        chai.request(app).post(process.env.BASE_ROUTE + '/follow/1/1/1').set('token', token).send(mockFollow).end((err, res) => {
            expect(res.status).to.equal(201);
            expect(res.body).to.have.property('followed');
            expect(res.body.followed).to.be.an('object');
            expect(res.body.followed).to.have.property('following');
            expect(res.body.followed).to.have.property('follower');
            expect(res.body.followed).to.have.property('user_id');
            done();
        })
    });

    it('should unfollow a user each time', done => {
        chai.request(app).put(process.env.BASE_ROUTE + '/unfollow/1/1/1').set('token', token).end((err, res) => {
            expect(res.status).to.equal(200);
            done();
        })
    })



})


