var routes = require('express');
var bodyParser = require('body-parser');

routes.get('/exercise/new_user', (req, res) => {
  console.log(req);
});

module.exports = routes;