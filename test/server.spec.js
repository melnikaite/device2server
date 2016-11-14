const { describe, it, after } = require('mocha');
const expect = require('chai').expect;
const { server } = require('../server.js');
const request = require('request');
const mongoose = require('mongoose');

const Status = mongoose.model('Status');

describe('server', () => {
  it('should return 200', (done) => {
    request.post('http://127.0.0.1:8080', { form: '{}' }, (err, res, body) => {
      expect(res.statusCode).to.equal(200);
      expect(body).to.equal('');
      done();
    });
  });

  it('should save data', (done) => {
    const data = { temperature: 36.6 };
    request.post('http://127.0.0.1:8080', { form: JSON.stringify(data) }, () => {
      Status.findOne((err, status) => {
        expect(status.toJSON()).to.include(data);
        done();
      });
    });
  });

  after(() => {
    server.close();
  });
});
