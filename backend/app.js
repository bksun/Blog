const express = require('express');
const bodyParser = require('body-parser')

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept" );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  next();
});

app.post('/api/posts', (req, res, next) => {
  const post = req.body;
  console.log(post);
  res.status(201).json({
    message: "post added successfully"
  });
});

app.get('/api/posts', (req, res, next) => {
  const posts = [
    {
      "id": 'sdsdsdsdsd2232365342',
      "title": 'my first title',
      "content": 'my first content'
    },
    {
      "id": 'aasdsdsdsdsd2232365342sd21',
      "title": 'my second title',
      "content": 'my second content'
    },
    {
      "id": 'aasdsdsdsdsd2232365342sd21',
      "title": 'my third title',
      "content": 'my third content'
    }
  ];

  res.status(200).json(
     {"posts": posts}
    );

});

app.use((req, res, next) => {
  res.end('first response from express');
});

module.exports = app;
