const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index.js');

const should = chai.should();
chai.use(chaiHttp);

describe('/GET /', () => {
    it('it should return success', (done) => {
        chai.request(server)
        .get('/')
        .end((err, res) => {
            res.should.have.status(200);
            done();
        })
    })
})