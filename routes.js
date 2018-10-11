var routes = require('express')();
var bodyParser = require('body-parser');

routes.post('/exercise/new-user', (req, res) => {
  console.log('req: ', req);
  res.json({message: 'Req received!'});
});

module.exports = routes;