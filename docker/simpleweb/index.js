const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Bye bye there');
});

app.listen(8080, () => {
  console.log('Listenging on port 8080');
});
