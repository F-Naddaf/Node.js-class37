'use strict';

import express from 'express';
import fetch from 'node-fetch';
import { API_KEY } from './src/keys.js';
const app = express();

app.use(express.json());

app.get('/', (_req, res) => {
  res.send(
    '<h1>Hello from backend to frontend!</h1><h3>This is about weather app</h3><p>Made by: Fadi Naddaf</p>'
  );
});

app.post('/weather', async (req, res) => {
  const { cityName } = req.body;
  const api_url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${API_KEY}`;
  try {
    const response = await fetch(api_url);
    const json = await response.json();
    if (!cityName) {
      return res.status(400).json({
        weatherText: 'Please enter a valid city name.',
      });
    }
    if (json.cod === '404') {
      res.status(404).json({ Message: 'City not found' });
    } else {
      res.status(200).json({
        weatherText: `The weather in ${json.name} is ${json.main.temp} degrees`,
      });
    }
  } catch (err) {
    res.status(500).json({ err: 'Something went wrong' });
  }
});

export default app;
