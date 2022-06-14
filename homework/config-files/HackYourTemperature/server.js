'use strict';

import express from 'express';
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('hello from backend to frontend!');
});

app.post('/weather', (req, res) => {
  const cityName = req.body.cityName;
  if (!cityName) {
    res.status(400).json({ msg: 'Please enter a valid city name' });
  } else {
    res.status(200).json({ cityName });
  }
});

app.listen(PORT);
