
require('./database/shema');
require('dotenv').config();
require('./database/mongdb');
const express = require('express');
const route = require('./route/User');

const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const session = require('express-session');
const app = express();
const path = require('path');

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public')); // For static files like images, css
app.use(express.urlencoded({extended:true}));

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
}));

app.get('/', (req, res) => {
  res.render('home');
});



// Login route
app.use("/user",route)





const port = process.env.PORT || 3000;
app.listen(3000, () => { 
  console.log(`Server start on ${port}`);
});
