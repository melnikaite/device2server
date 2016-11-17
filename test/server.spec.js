const { describe, it, after } = require('mocha');
const expect = require('chai').expect;
const { server } = require('../server.js');
const request = require('request');
const mongoose = require('mongoose');
const DatabaseCleaner = require('database-cleaner');

const databaseCleaner = new DatabaseCleaner('mongodb');
const Status = mongoose.model('Status');

describe('server', () => {
  it('should return 200', (done) => {
    request.post(process.env.ENDPOINT, { form: '{}' }, (err, res, body) => {
      expect(res.statusCode).to.equal(200);
      expect(body).to.equal('');
      done();
    });
  });

  it('should save data', (done) => {
    const data = { temperature: 36.6 };
    databaseCleaner.clean(mongoose.connection.db, () => {
      request.post(process.env.ENDPOINT, { form: JSON.stringify(data) }, () => {
        Status.findOne((err, status) => {
          expect(status.toJSON()).to.include(data);
          done();
        });
      });
    });
  });

  after(() => {
    server.close();
  });
});
