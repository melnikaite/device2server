const { describe, it, beforeEach, afterEach } = require('mocha');
const expect = require('chai').expect;
const sinon = require('sinon');
const { sendData } = require('../device.js');
const request = require('request');

describe('device', () => {
  beforeEach(() => {
    sinon.stub(request, 'post');
  });

  it('should send post params in request body', (done) => {
    sendData();
    const matchTemperature = sinon.match((form) => {
      const temperature = JSON.parse(form).temperature;
      return typeof temperature === 'number';
    });
    expect(request.post.calledWith(process.env.ENDPOINT, { form: matchTemperature })).to.equal(true);
    done();
  });

  afterEach(() => {
    request.post.restore();
  });
});
