'use strict';

import supertest from 'supertest';
import app from '../app.js';

const request = supertest(app);

describe('/', () => {
  it('should print message on html format', async () => {
    const response = await request.get('/');
    expect(response.statusCode).toBe(200);
    expect.stringContaining('html');
  });
});

describe('POST /weather', () => {
  it('should give a city name', async () => {
    const body = {
      cityName: 'London',
    };
    const response = await request.post('/weather').send(body);
    expect(response.statusCode).toBe(200);
    expect.objectContaining({
      cityName: 'London',
      temperature: expect.any(Number),
    });
  });
  it('should respond with a 400 status if not enter any city name', async () => {
    const body = {
      cityName: '',
    };
    const response = await request.post('/weather').send(body);
    expect(response.statusCode).toEqual(400);
    expect.stringContaining('json');
  });
  it('should respond with a 404 status if enter invalid city name', async () => {
    const body = {
      cityName: 'asdffs',
    };
    const response = await request.post('/weather').send(body);
    expect(response.statusCode).toEqual(404);
    expect.stringContaining('json');
  });
});

describe('POST /weather', () => {
  it('should respond with a 500 status if the server not response', async () => {
    const response = await request.post('/weather');
    expect(response.statusCode).toEqual(500);
    expect.stringContaining('json');
  });
});
