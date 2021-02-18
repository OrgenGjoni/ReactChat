const mongoose = require('mongoose');
require('dotenv').config();
const dbServer = process.env.DB_SERVER;
const dbName = process.env.DB_NAME;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName : dbName,
}

mongoose.connect(dbServer, options)
        .catch((err)=>{console.log(err)});

const db = mongoose.connection ;

module.exports = db;
