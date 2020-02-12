import express from 'express';

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.send('respond with a resource');
});

export default router;
