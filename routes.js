var routes = require('express')();
var bodyParser = require('body-parser');
var User = require('./models/User');
var Exercise = require('./models/Exercise');

routes.post('/exercise/new-user', (req, res) => {
  User.find({ username: req.body.username }, (err, user) => {
    if(err) throw err;
    if(user) {
      return res.json(user);
    }else{
      let newUser = new User({username: req.body.username});
      newUser.save((err, uzer) => {
        if(err) throw err;
        return res.json(uzer);
      });    
    }
  });
});

routes.get('/exercise/users', (req, res) => {
  User.find((err, users) => {
    if(err) throw err;
    if(users) return res.json(users);
  });
});

module.exports = routes;