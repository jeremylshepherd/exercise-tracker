var routes = require('express')();
var bodyParser = require('body-parser');
var User = require('./models/User');
var Exercise = require('./models/Exercise');


//Create new User
routes.post('/exercise/new-user', (req, res) => {
  console.log(req.body.username);
  User.findOne({ username: req.body.username }, (err, user) => {
    if(err) throw err;
    if(user) {
      console.log('User found');
      res.json(user);
    }else{
      console.log('No user found, creating new one.');
      let newUser = new User({username: req.body.username});
      newUser.save((err, uzer) => {
        if(err) throw err;
        res.json(uzer);
      });    
    }
  });
});

//GET all users
routes.get('/exercise/users', (req, res) => {
  console.log(req);
  User.find((err, users) => {
    if(err) throw err;
    if(users) return res.json(users);
  });
});

routes.post('/exercise/add', (req, res) => {
  User.findOne({ _id: req.body.userId }, (err, user) => {
    if(err) throw err;
    if(!user) {
      return es.json({ message: 'No user found, please register first.' });
    }
    let exercise = new Exercise({
      description: req.bo
    })
  });
});

module.exports = routes;