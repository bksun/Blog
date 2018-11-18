const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./model/post.model');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));


mongoose.connect('mongodb://localhost/blog', { useMongoClient: true, promiseLibrary: require('bluebird') })
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept" );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  next();
});

app.delete('/api/delete/:id', (req, res) => {
  Post.deleteOne({_id: req.params.id}).then((result) => {
   res.status(200).json({
    message: "Post Deleted Successfully"
  });
  })
  .catch(err => {
    console.log("error message: ", err.message);
  })
});

app.post('/api/posts', (req, res, next) => {
  const post = new Post({title: req.body.title, content: req.body.content});
  post.save().then(() => {
  Post.findOne({title: post.title}).then(result => {
    res.status(201).json({
    message: "post added successfully",
    newPost: { id: result._id, title: '', content: ''}
  });
  })
  .catch(err => {
    console.log( 'problem in Getting new post -> ' + err.message);
})
})
  .catch(err => {
      console.log( 'problem in Adding new post -> ' + err.message);
  })
});


app.get('/api/posts', (req, res, next) => {
  Post.find().then( (results) => {
    res.status(200).json(
      {"message": "Data fetched successfully",
      "posts": results}
     );
    })
});

app.use((req, res, next) => {
  res.end('first response   from express');
});

module.exports = app;
