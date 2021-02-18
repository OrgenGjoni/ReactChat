const app = require('./app');
const server = require('http').createServer(app);
const socket = require('./socket');

require('dotenv').config();
const port = process.env.PORT;

server.listen(port,()=>{
  console.log('Connected');
})

socket(server);
