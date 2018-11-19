const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const postRoute = require('./routes/posts');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));


mongoose.connect('mongodb://localhost/blog', { useMongoClient: true, promiseLibrary: require('bluebird') })
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));


  app.use((req, res, next) => {
    console.log(req.path);
    // console.log(req);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept" );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    next();
  });

app.use("/app/posts", postRoute);
module.exports = app;
