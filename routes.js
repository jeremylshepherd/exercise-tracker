var routes = require('express')();
var bodyParser = require('body-parser');
var User = require('./models/User');
var Exercise = require('./models/Exercise');

const convertDate = (str) => {
  let year = +str.slice(0, 4); 
  let month = +str.slice(4, 6); 
  let day = +str.slice(6, 8);
  return Date.parse(new Date(year, month - 1, day));
};

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
    if(req.body.date && req.body.date.length == 8) {
      obj.date = convertDate(req.body.date);
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

routes.get('/exercise/log', (req, res) => {
  User.findOne({ _id: req.query.userId }, (err, user) => {
    if(err) throw err;
    if(!user) {
      return res.json({ message: 'No user found, please register first.' });
    }
    let query = Exercise.find({ creator: user._id });
    if(req.query.limit) query = query.limit(req.query.limit);
    if(req.query.sort) query = 
    
    , (err, exercise) => {
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

routes.get('//', (req, res) => {

});

module.exports = routes;