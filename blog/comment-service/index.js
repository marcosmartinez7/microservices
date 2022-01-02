const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
app.use(express.json());
app.use(cors());

const { randomBytes } = require('crypto');

const comments = {};

app.get('/posts/:id/comments', (req, res) => {
  const { id } = req.params;

  res.send(comments[id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  const commentId = randomBytes(4).toString('hex');

  const currentComments = comments[id] || [];

  currentComments.push({
    id: commentId,
    content,
    status: 'pending',
  });

  comments[id] = currentComments;

  await axios
    .post('http://event-bus-srv:4005/events', {
      type: 'CommentCreated',
      data: { id: commentId, content, postId: id, status: 'pending' },
    })
    .catch((error) => console.log(error));

  res.status(201).send(comments[id]);
});

app.post('/events', async (req, res) => {
  console.log('Received event', req.body);
  const { type } = req.body;
  if (type === 'CommentModerated') {
    const { id, content, postId, status } = req.body.data;
    const commentsOfPost = comments[postId];
    const comment = commentsOfPost.find((comment) => {
      return (comment.id = id);
    });
    comment.status = status;
    await axios
      .post('http://event-bus-srv:4005/events', {
        type: 'CommentUpdated',
        data: { id, postId, content, status },
      })
      .catch((error) => console.log(error));
  }
  res.status(200).send({});
});

app.listen(4001, () => {
  console.log('comment-service started on port 4001');
});
