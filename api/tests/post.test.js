import chai, { expect } from 'chai';
import chaiHTTP from 'chai-http';
import app from '../app';
import { generateToken } from '../utils/auth.utils';
import { postMock } from '../__mock__/_mock_';

chai.use(chaiHTTP);
const token = generateToken(1,)

describe('testing post endpoints', () => {

    it('should return bad requst 400', done => {
        chai.request(app).post(process.env.BASE_ROUTE + '/post/1').set('token', token)
            .send({}).end((err, res) => {
                expect(res.status).to.equal(400);
                expect(res.body).to.have.property('message');
                expect(res.body.message).to.be.a('string');
                expect(res.body.message).to.equal('bad reqest');
                done();
            })
    })

    it('should make a post each time', done => {
        chai.request(app).post(process.env.BASE_ROUTE + '/post/1').set('token', token)
            .send(postMock).end((err, res) => {
                expect(res.status).to.equal(201);
                expect(res.body).to.have.property('newPost');
                expect(res.body.newPost).to.be.an('object');
                expect(res.body.newPost).to.have.property('caption');
                expect(res.body.newPost.caption).to.be.a('string');
                done();
            })
    });

    it('should update a post each time', done => {
        chai.request(app).put(process.env.BASE_ROUTE + '/post/1/1').set('token', token).send({ caption: 'this is a new caption', image: 'www.image.com/image' }).end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('updatedPost');
            expect(res.body.updatedPost).to.be.an('object');
            expect(res.body.updatedPost).to.have.property('caption');
            done();
        })
    })

});


