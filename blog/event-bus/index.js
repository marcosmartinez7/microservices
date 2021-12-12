const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const events = [];

app.post('/events', (req, res) => {
  const event = req.body;
  console.log('Received event at bus ', event);
  events.push(event);
  axios.post('http://localhost:4000/events', event).catch((err) => {
    console.log(err.message);
  });
  axios.post('http://localhost:4001/events', event).catch((err) => {
    console.log(err.message);
  });
  axios.post('http://localhost:4002/events', event).catch((err) => {
    console.log(err.message);
  });

  axios.post('http://localhost:4003/events', event).catch((err) => {
    console.log(err.message);
  });

  res.status(200).send({});
});

app.get('/events', (req, res) => {
  res.status(200).send(events);
});

app.listen(4005, () => {
  console.log('event-bus started on port 4005');
});
