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
    expect(request.post.calledWith('http://127.0.0.1:8080', sinon.match.has('form'))).to.equal(true);
    done();
  });

  afterEach(() => {
    request.post.restore();
  });
});
