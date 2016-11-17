const http = require('http');
const mongoose = require('mongoose');
const cfenv = require('cfenv');
require('dotenv').config({ path: `.env.${process.env.NODE_ENV || 'dev'}`, silent: true });

const appEnv = cfenv.getAppEnv();
mongoose.connect(appEnv.getServiceURL('mongodb-instance'));
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error: '));
const Status = mongoose.model('Status', mongoose.Schema({ temperature: Number }));

module.exports.server = http.createServer((req, res) => {
  req.on('data', (chunk) => {
    const data = JSON.parse(chunk.toString());
    console.log(`Got data from device: ${data.temperature}`);
    Status.create({ temperature: data.temperature }, (err, status) => {
      if (err) {
        console.error(err);
        res.end();
        return;
      }
      console.log(`Saved to database with id: ${status.id}`);
      res.end();
    });
  });
});

module.exports.server.listen({
  host: appEnv.bind,
  port: appEnv.port,
});
