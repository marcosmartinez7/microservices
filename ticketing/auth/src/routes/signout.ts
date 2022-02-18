import express from 'express';

const router = express.Router();

router.post('/api/users/signout', (req, res)=>{
  res.send('Hi there 2!');
});

export { router as signoutRouter }