// ### Require modules ###
const express = require('express');
const hbs = require('hbs');
const mongoose = require('mongoose');
const Task = require('./models/task');

// ### Create express app ###
const app = express();

// ### Parse requests ###
app.use(express.urlencoded({ extended: true }));

// ### Handle views by hbs ###
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

// ### Set public folder ###
app.use(express.static('public'));

// ### Route handler home view ###
app.get('/', (req, res) => {
   Task.find()
      .then((tasks) => {
         res.render('home', { tasks });
      })
      .catch(error => {
         console.log('There was an error dealing with MongoDB.', error);
      });
});

// ### Route handler create task ###
app.post('/create-to-do-list-item', (req, res) => {
   const title = req.body.title;
   Task.create({ title })
      .then(() => {
         res.redirect('/');
      })
      .catch(error => {
         console.log('There was an error dealing with MongoDB.', error);
      });
});

// ### Route handler delete task ###
app.post('/task/:id/delete', (req, res) => {
   const taskId = req.params.id;
   Task.findByIdAndDelete(taskId)
      .then(() => {
         res.redirect('/');
      })
      .catch(error => {
         console.log('There was an error dealing with MongoDB.', error);
      })
});

// ### Route handler get task update ###
app.get('/task/:id/update', (req, res) => {
   const taskId = req.params.id;
   Task.findById(taskId)
      .then((task) => {
         res.render('task-update', { task })
      })
      .catch(error => {
         console.log('There was an error dealing with MongoDB.', error);
      })
});

// ### Route handler post task update ###
app.post('/task/:id/update', (req, res) => {
   const taskId = req.params.id;
   const title = req.body.title;
   Task.findByIdAndUpdate(taskId, { title })
      .then(() => {
         res.redirect('/');
      })
      .catch(error => {
         console.log('There was an error dealing with MongoDB.', error);
      })
});

// ### MongoDB URI string ###
const MONGODB_URI = 'mongodb://localhost:27017/todo-list';

// ### Connect to DB and start listening ###
mongoose.connect(MONGODB_URI)
   .then(() => {
      app.listen(3000);
   });
