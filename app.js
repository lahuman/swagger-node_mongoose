'use strict';
global.__basedir = __dirname;
require('dotenv').config();
require(`${__basedir}/config/connect`);

const SwaggerExpress = require('swagger-express-mw');
const SwaggerUi = require('swagger-tools/middleware/swagger-ui');
const app = require('express')();
const helmet = require('helmet');
const winston = require('./config/winston');
const morgan = require('morgan');

module.exports = app; // for testing

const config = {
  appRoot: __dirname // required config
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // Dynamic swagger host
  swaggerExpress.runner.swagger.host = process.env.HOST
  app.use(helmet());
  app.use(morgan('combined', { stream: winston.stream }));
  
  const options = {
    apiDocs: '/api/api-docs',
    swaggerUi: '/api/docs'
  }
  // enable SwaggerUI
  app.use(SwaggerUi(swaggerExpress.runner.swagger, options));

  // install middleware
  swaggerExpress.register(app);

  var port = process.env.PORT || 10010;
  app.listen(port);



// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // add this line to include winston logging
  winston.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

  if (swaggerExpress.runner.swagger.paths['/hello']) {
    console.log('try this:\ncurl http://127.0.0.1:' + port + '/hello?name=Scott');
  }
});
