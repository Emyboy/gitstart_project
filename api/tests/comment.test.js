import chai, { expect } from 'chai';
import chaiHTTP from 'chai-http';
import app from '../app';
import dotenv from 'dotenv';
// import request from 'supertest';
import { generateToken } from '../utils/auth.utils';
import { commentMock, mockUser } from '../__mock__/_mock_';

chai.use(chaiHTTP);

const token = generateToken(1, mockUser.email);

describe('testing comment routes', () => {

    it('should create a comment each time', done => {
        chai.request(app).post(process.env.BASE_ROUTE + '/comment').set('token', token).send(commentMock).end((err, res) => {
            expect(res.status).to.equal(201);
            expect(res.body).to.have.property('newComment');
            expect(res.body.newComment).to.be.an('object');
            expect(res.body.newComment).have.property('comment');
            expect(res.body.newComment.comment).to.equal(commentMock.comment);
            done();
        })
    });

    it('should update a users comment each time', done => {
        chai.request(app).put(process.env.BASE_ROUTE + '/comment/update').set('token', token).send({ ...commentMock, comment: 'i changed the comment', comment_id: 1 }).end((err, res) => {
            // expect(err).to.not.exist;
            // expect(res.status).to.equal(200);
            expect(res.body).to.have.property('updatedComment');
            expect(res.body.updatedComment).to.have.property('comment');
            expect(res.body.updatedComment.comment).to.equal('i changed the comment')
            done();
        })
    })
    
})



