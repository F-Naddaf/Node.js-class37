'use strict';

import supertest from 'supertest';
import app from '../app.js';

const request = supertest(app);

describe('/', () => {
  it('should respond with a 200 status code', async () => {
    const response = await request.get('/');
    expect(response.statusCode).toBe(200);
  });
  it('should specify html in the content type header', async () => {
    const response = await request.get('/');
    expect(response.headers['content-type']).toEqual(
      expect.stringContaining('html')
    );
  });
});

describe('POST /weather', () => {
  describe('write a city name', () => {
    const body = {
      cityName: 'London',
    };
    it('should respond with a 200 status code', async () => {
      const response = await request.post('/weather').send(body);
      expect(response.statusCode).toBe(200);
    });
    it('should specify json in the content type header', async () => {
      const response = await request.post('/weather').send(body);
      expect(response.headers['content-type']).toEqual(
        expect.stringContaining('json', 'object', 'number')
      );
    });
    
  });
});

describe('POST /weather', () => {
  describe('Give a city name', () => {
    const body = {
      cityName: 'London',
    };
    it('should respond with a 200 status code', async () => {
      const response = await request.post('/weather').send(body);
      expect(response.statusCode).toBe(200);
    });
    it('should specify json in the content type header', async () => {
      const response = await request.post('/weather').send(body);
      expect(response.headers['content-type']).toEqual(
        expect.stringContaining('json')
      );
    });
  });

  describe('Not giving any city name', () => {
    const body = {
      cityName: '',
    };
    it('should respond with a 400 status code', async () => {
      const response = await request.post('/weather').send(body);
      expect(response.statusCode).toBe(400);
    });
    it('should specify json in the content type header', async () => {
      const response = await request.post('/weather').send(body);
      expect(response.headers['content-type']).toEqual(
        expect.stringContaining('json')
      );
    });
  });

  describe('Give a invalid city name', () => {
    const body = {
      cityName: 'asdffs',
    };
    it('should respond with a 404 status code', async () => {
      const response = await request.post('/weather').send(body);
      expect(response.statusCode).toBe(404);
    });
    it('should specify json in the content type header', async () => {
      const response = await request.post('/weather').send(body);
      expect(response.headers['content-type']).toEqual(
        expect.stringContaining('json')
      );
    });
  });

  describe('Server not response', () => {
    it('should respond with a 500 status code', async () => {
      const response = await request.post('/weather').send(body);
      expect(response.statusCode).toBe(404);
    });
    it('should specify json in the content type header', async () => {
      const response = await request.post('/weather').send(body);
      expect(response.headers['content-type']).toEqual(
        expect.stringContaining('json')
      );
    });
  });
});
