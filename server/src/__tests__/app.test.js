import request from 'supertest';
import db from '../db';
import app from '../app';
import dotenv from 'dotenv';

dotenv.config();

describe('Testing the root path', () => {
  beforeAll(() => db.dbConnect());
  test('It should response the GET method for root path', async () => {
    const res = await request(app).get('/api/');
    expect(res.statusCode).toEqual(200);
  });
  afterAll(() => db.dbDisconnect());
});
