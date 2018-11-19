const express = require('express');
const Post = require('../model/post.model');
const router = express.Router();

router.delete('/api/delete/:id', (req, res) => {
  Post.deleteOne({_id: req.params.id}).then((result) => {
   res.status(200).json({
    message: "Post Deleted Successfully"
  });
  })
  .catch(err => {
    console.log("error message: ", err.message);
  })
});

router.post('/api/posts', (req, res, next) => {
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

router.get('/api/posts', (req, res, next) => {
  console.log('reached to get');
  Post.find().then( (results) => {
    res.status(200).json(
      {"message": "Data fetched successfully",
      "posts": results}
     );
    })
});


module.exports = router;
