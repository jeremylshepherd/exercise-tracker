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
    console.log(req.body.date);
    if(err) throw err;
    if(!user) {
      return res.json({ message: 'No user found, please register first.' });
    }
    let obj = {};
    obj.creator = user._id;
    obj.description = req.body.description;
    obj.duration = req.body.duration;
    if(req.body.date) {
      obj.date = req.body.date;
    }
    let exercise = new Exercise(obj);
    exercise.save((err, data) => {
      if(err) throw err;
      Exercise.find({ creator: user._id}, (err, exercises) => {
        let obj2 = {};
        obj2._id = user._id;
        obj2.username = user.username;
        obj2.exercises = exercises;
        
        return res.json(obj2);
      });      
    });
  });
});

routes.get('/exercise/log/:userId', (req, res) => {
  User.findOne({ _id: req.params.userId }, (err, user) => {
    if(err) throw err;
    if(!user) {
      return res.json({ message: 'No user found, please register first.' });
    }
    Exercise.find({ creator: user._id }, (err, exercise) => {
      if(err) throw err;
      let obj = {};
      obj._id = user._id;
      obj.username = user.username;
      obj.exercises = exercise;
      obj.count = exercise.length;
      return res.json(obj);
    });
  });
});

module.exports = routes;