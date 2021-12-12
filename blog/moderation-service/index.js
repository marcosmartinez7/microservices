const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

app.post('/events', async (req, res) => {
  console.log('Received event', req.body);
  const { type, data } = req.body;

  if (type === 'CommentCreated') {
    const { id, postId, content } = data;
    const status = content.includes('orange') ? 'rejected' : 'approved';
    await axios.post('http://localhost:4005/events', {
      type: 'CommentModerated',
      data: {
        id,
        postId,
        content,
        status,
      },
    });
  }

  res.status(200).send({});
});

app.listen(4003, () => {
  console.log('moderation-service started on port 4003');
});
