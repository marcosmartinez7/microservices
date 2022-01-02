const express = require('express');
const cors = require('cors');
const app = express();
const axios = require('axios');
app.use(express.json());
app.use(cors());

const posts = {};

const handleEvent = (type, data) => {
  if (type === 'PostCreated') {
    const { id, title } = data;
    posts[id] = {
      id,
      title,
      comments: [],
    };
  }

  if (type === 'CommentCreated') {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    post.comments.push({ id, content, status });
  }

  if (type === 'CommentUpdated') {
    const { id, postId, content, status } = data;
    const post = posts[postId];
    const comment = post.comments.find((comment) => {
      return comment.id === id;
    });
    comment.status = status;
    comment.content = content;
  }
};

app.post('/events', (req, res) => {
  console.log('Received event', req.body);
  const { type, data } = req.body;
  handleEvent(type, data);
  res.status(200).send({});
});

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.listen(4002, async () => {
  console.log('query-service started on port 4002');

  console.log('Events sync started');

  try {
    const res = await axios.get('http://event-bus-srv:4005/events');

    for (let event of res.data) {
      console.log('Processing event:', event);
      handleEvent(event.type, event.data);
    }
  } catch (error) {
    console.log(error);
  }
});
