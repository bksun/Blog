const express = require('express');
const Post = require('../model/post.model');
const router = express.Router();

const checkAuth = require("../middleware/check-auth");

console.log('API Checking...');

router.use((req, res, next) => {
  console.log(req.path);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept" );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  next();
});


router.delete('/:id', checkAuth, (req, res, next) => {
  console.log('reached to delete', req.params.id);
  Post.deleteOne({_id: req.params.id}).then((result) => {
   res.status(200).json({
    message: "Post Deleted Successfully"
  });
  })
  .catch(err => {
    console.log("error message: ", err.message);
  })
});

router.post('/', checkAuth, (req, res, next) => {
  console.log('reached to post');
  const post = new Post({id: null, title: req.body.title, content: req.body.content});
  post.save().then(result => {
    res.status(201).json({
    message: "post added successfully",
    createdId: result._id
  });
  })
  .catch(err => {
    console.log( 'problem in Getting new post -> ' + err.message);
})
})

router.get('/', (req, res, next) => {
  console.log('reached to get');
  Post.find().then( (results) => {
    res.status(200).json(
      {"message": "Data fetched successfully",
      "posts": results}
     );
    })
});

console.log('post API coming out');

module.exports = router;
