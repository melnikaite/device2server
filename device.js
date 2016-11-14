const request = require('request');

const url = process.env.ENDPOINT;
module.exports.sendData = () => {
  console.log('Sending data to the server');
  const data = JSON.stringify({
    temperature: Math.random().toString().slice(0, 4),
  });
  request.post(url, { form: data });
};

setInterval(module.exports.sendData, 1000);
