import chai, { expect } from 'chai';
import chaiHTTP from 'chai-http';
import app from '../app';
import { mockFollow, mockUser } from '../__mock__/_mock_'
import { generateToken } from '../utils/auth.utils';

const token = generateToken(1, mockUser.email);
chai.use(chaiHTTP);

describe('testing follow and unfollow routes', () => {
    

    it('should follow a user each time', done => {
        chai.request(app).post(process.env.BASE_ROUTE + '/follow/1/1/1').set('token', token).end((err, res) => {
            
            // expect(res.status).to.equal(201);
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
            console.log({
                ERROR: err,
                RES: res.body
            })
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.equal('unfollowed');
            done();
        })
    });

    it('should get all users followers', done => {
        chai.request(app).get(process.env.BASE_ROUTE + '/followers/1').end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('followers');
            expect(res.body.followers).to.be.an('array');
            expect(res.body).to.have.property('count');
            expect(res.body.count).to.be.a('number');
            done();
        })
    })



})


