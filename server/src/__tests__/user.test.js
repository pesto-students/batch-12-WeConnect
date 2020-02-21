import request from 'supertest';
import db from '../db';
import app from '../app';
import User from '../models/user';
import jwt from 'jsonwebtoken';
import constants from '../constants/token';

describe("Testing the user api's", () => {
  const user = {
    firstName: 'test',
    lastName: 'test',
    email: 'test@test.com',
    password: 'test@1234',
    role: 1,
    phone: '+1234567890',
  };

  let userId;
  let token;

  beforeAll(() => db.dbConnect());
  describe('Testing the user registration api', () => {
    beforeAll(() => User.deleteOne({ email: 'test@test.com' }));
    test('Test with all correct inputs', async () => {
      const res = await request(app)
        .post('/api/users/register')
        .send(user);
      userId = res.body.user._id;
      expect(res.statusCode).toEqual(201);
      expect(res.body.user._id).toBeTruthy();
      expect(res.body.user.firstName).toBeTruthy();
      expect(res.body.user.lastName).toBeTruthy();
      expect(res.body.user.email).toBeTruthy();
      expect(res.body.user.password).toBeTruthy();
      expect(res.body.user.phone).toBeTruthy();
      expect(res.body.user.role).toBeTruthy();
    });

    test('Test with invalid email input', async () => {
      const res = await request(app)
        .post('/api/users/register')
        .send({ ...user, email: 'test' });
      expect(res.statusCode).toEqual(400);
    });

    test('Test with duplicate email input', async () => {
      const res = await request(app)
        .post('/api/users/register')
        .send(user);
      expect(res.statusCode).toEqual(400);
    });
  });

  describe('Testing the user login api', () => {
    test('Test with invalid email input', async () => {
      const res = await request(app)
        .post('/api/users/login')
        .send({
          email: 'test@.com',
          password: 'test@1234',
        });
      expect(res.statusCode).toEqual(400);
    });

    test('Test with invalid password input', async () => {
      const res = await request(app)
        .post('/api/users/login')
        .send({
          email: 'test@test.com',
          password: '',
        });
      expect(res.statusCode).toEqual(400);
    });

    test('Test with Valid password input', async () => {
      const res = await request(app)
        .post('/api/users/login')
        .send({
          email: 'test@test.com',
          password: 'test@1234',
        });
      expect(res.statusCode).toEqual(200);
      expect(res.body.user._id).toBeTruthy();
      expect(res.body.user.firstName).toBeTruthy();
      expect(res.body.user.lastName).toBeTruthy();
      expect(res.body.user.lastName).toBeTruthy();
      expect(res.body.user.email).toBeTruthy();
      expect(res.body.user.password).toBeTruthy();
      expect(res.body.user.phone).toBeTruthy();
      expect(res.body.user.role).toBeTruthy();
    });
  });

  describe('Testing the user profile api', () => {
    beforeAll(() => {
      token = jwt.sign({ _id: userId }, constants.JWT_KEY);
    });

    test('Test to get user details with correct token', async () => {
      const res = await request(app)
        .get('/api/users/me')
        .set('Cookie', [`token=${token}`]);
      expect(res.statusCode).toEqual(200);
      expect(res.body.user._id).toBeTruthy();
      expect(res.body.user.firstName).toBeTruthy();
      expect(res.body.user.lastName).toBeTruthy();
      expect(res.body.user.lastName).toBeTruthy();
      expect(res.body.user.email).toBeTruthy();
      expect(res.body.user.password).toBeTruthy();
      expect(res.body.user.phone).toBeTruthy();
      expect(res.body.user.role).toBeTruthy();
    });

    test('Test to get user details with invalid token', async () => {
      const res = await request(app)
        .get('/api/users/me')
        .set('Cookie', [`token=${''}`]);
      expect(res.statusCode).toEqual(401);
    });
  });

  describe('Test the logout api', () => {
    test('Test to log the user out with invalid token', async () => {
      const res = await request(app)
        .post('/api/users/me/logout')
        .set('Cookie', [`token=${''}`]);
      expect(res.statusCode).toEqual(401);
    });

    test('Test to log the user out with valid token', async () => {
      const res = await request(app)
        .post('/api/users/me/logout')
        .set('Cookie', [`token=${token}`]);
      expect(res.statusCode).toEqual(200);
    });
  });

  afterAll(() => {
    return User.deleteOne({ _id: userId }, () => {
      return db.dbDisconnect();
    });
  });
});
