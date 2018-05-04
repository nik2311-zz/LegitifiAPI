'use strict';

var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();
const cors = require('cors')
const auth = require('./auth/jwt_auth.js')

app.use(cors())
module.exports = app; // for testing

var config = {
  appRoot: __dirname, // required config
  swaggerSecurityHandlers: {
    jsonApiKey: auth.VerifyUser
  }
};

SwaggerExpress.create(config, function (err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  var port =  process.env.APPPORT;
  app.listen(port,process.env.APPIP);

  // if (swaggerExpress.runner.swagger.paths['/hello']) {
  //   console.log('try this:\ncurl http://127.0.0.1:' + port + '/hello?name=Scott');
  // }
});
