const __basedir = '../../..'
require('dotenv').config({path: `${__basedir}/.env`});

const fs = require('fs');
const join = require('path').join;
const mongoose = require('mongoose');
const logger = require(`${__basedir}/config/winston`);

const models = join(__basedir, 'models');


// Bootstrap models
fs.readdirSync(models)
  .filter(file => ~file.search(/^[^.].*\.js$/))
  .forEach(file => require(join(models, file)));

let reConnectCnt = 0;

const  connect = () => {
  logger.debug('process.env.CONNECT_URL: ' + process.env.CONNECT_URL)
  mongoose.connection
    .on('error', (err)=> {
      logger.error(err);
    })
    .on('connection', () => {
      logger.debug('MongoDB Connection success');
      reConnectCnt = 0;
    })
    .on('disconnected', () => {
      setTimeout(e => {
        if (reConnectCnt < 5) {
          logger.debug('MongoDB Connection faild : ' + reConnectCnt);
          reConnectCnt++;
          connect();
        }
      }, 500);
    });
    const con = mongoose.connect(process.env.CONNECT_URL, { keepAlive: 1, useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true });
    return con;
}

connect();