const http = require('http');
const mongoose = require('mongoose');
const cfenv = require('cfenv');

const appEnv = cfenv.getAppEnv();
mongoose.connect(appEnv.getServiceURL('mongodb-instance') || 'mongodb://127.0.0.1/device2server');
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

const options = {
  host: appEnv.bind || '127.0.0.1',
  port: appEnv.port,
};
module.exports.server.listen(options, () => {
  console.log(`ENDPOINT=http://${options.host}:${options.port}`);
});
