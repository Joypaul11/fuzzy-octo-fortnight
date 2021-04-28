const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index.js');

const should = chai.should();
chai.use(chaiHttp);

describe('/GET /orders', () => {
    it('it should return success', (done) => {
        chai.request(server)
        .get('/orders')
        .end((err, res) => {
            res.should.have.status(200);
            done();
        })
    })
})

describe('/PUT /orders/:orderid', () => {
    it('it should return success', (done) => {
        chai.request(server)
        .put('/orders/-MZ7QRoGREHyjk6-X_SG')
        .set('content-type', 'application/json')
        .send({
            "bookingDate": "2021-04-27",
            "orderTitle": "order Title 7"
        })
        .end((err, res) => {
            res.should.have.status(200);
            done();
        })
    })

    it('it should return not found', (done) => {
        chai.request(server)
        .put('/orders/')
        .set('content-type', 'application/json')
        .send({
            "bookingDate": "2021-04-27",
            "orderTitle": "order Title 7"
        })
        .end((err, res) => {
            res.should.have.status(404);
            done();
        })
    })

    it('it should return fail', (done) => {
        chai.request(server)
        .put('/orders/wrongid')
        .set('content-type', 'application/json')
        .send({
            "bookingDate": "2021-04-27",
            "orderTitle": "order Title 7"
        })
        .end((err, res) => {
            res.should.have.status(500);
            done();
        })
    })
})


describe('/POST /orders', () => {
    it('it should return fail', (done) => {
        chai.request(server)
        .post('/orders')
        .set('content-type', 'application/json')
        .send({
            "address": {
                "city": "Berlin",
                "country": "Germany",
                "street": "Street1",
                "zip": "75008"
            },
            "bookingDate": "1619622099",
            "customer": {
                "email": "test@gmail.com",
                "name": "Caballero",
                "phone": "123123123"
            },
            "title": "order-5600"
        })
        .end((err, res) => {
            res.should.have.status(500);
            done();
        })
    })
})