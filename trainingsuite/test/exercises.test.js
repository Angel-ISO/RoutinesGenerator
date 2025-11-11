import request from 'supertest';
import app from '../src/app.js';

describe('Exercises API', () => {
  it('GET /api/exercises should return 200', async () => {
    const response = await request(app).get('/api/exercises');
    expect(response.status).toBe(200);
  });
});