// ### Require modules ###
const express = require('express');
const hbs = require('hbs');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.use(express.static('public'));

app.get('/', (req, res) => {
   res.render('home');
});

app.listen(3000);
