import chai from 'chai';
import chaiHTTP from 'chai-http';
import app from '../app';
import dotenv from 'dotenv';

chai.use(chaiHTTP);
dotenv.config();

describe('Testing auth routes', () => {
    afterEach(done => {
        done();
    })
    it('should send working from AUTH', done => {
        chai.request(app).get(process.env.BASE_ROUTE+'/auth').end((err, res) => {
            // console.log(res.BODY);
            done();
        })
    })

})

