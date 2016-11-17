const request = require('request');
require('dotenv').config({ path: `.env.${process.env.NODE_ENV || 'dev'}`, silent: true });

const url = process.env.ENDPOINT;
module.exports.sendData = () => {
  console.log('Sending data to the server');
  const data = JSON.stringify({
    temperature: parseFloat(Math.random().toString().slice(0, 4)),
  });
  request.post(url, { form: data });
};

setInterval(module.exports.sendData, 1000);
