import express from 'express';
import { json } from 'body-parser';

const app = express();
app.use(json());

app.listen(3000, ()=>{
  console.log('Auth service started at port 3000!');
})


app.get('/api/users/currentuser', (req, res)=>{
  res.send('Hi there!');
})