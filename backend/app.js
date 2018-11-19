const express = require('express');
var app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const postRoute = require('./routes/posts');
const userRoute = require('./routes/user');


mongoose.connect('mongodb://localhost/blog', { useMongoClient: true, promiseLibrary: require('bluebird') })
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));

app.use((req, res, next) => {
    console.log(req.path);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization" );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    next();
  });

  app.use("/api/posts", postRoute);
  app.use("/api/user",  userRoute);

module.exports = app;
