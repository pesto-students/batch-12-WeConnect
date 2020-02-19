import request from 'supertest';
import db from '../db';
import app from '../app';
import Booking from '../models/booking';

describe("Testing the booking api's", () => {
  const book = {
    userId: '5e46de5f74cbab298933d0c0',
    locationId: '5e4db884755154345f5aa65b',
    locationName: 'Delhi',
    workspaceId: '5e4db884755154345f5aa65c',
    workspaceName: 'We Work 1',
    floorId: '5e4db9685981a604dba0a252',
    floorName: 'Floor 2',
    owner: '5e4ee1bb4e660eac9beeec18',
    roomId: '5e4db9e290aa2554e2fb7aaf',
    roomName: 'Room 2',
    meetingStartTime: '2020-03-01 05:00',
    meetingEndTime: '2020-03-01 06:00',
  };
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTQ2ZGU1Zjc0Y2JhYjI5ODkzM2QwYzAiLCJpYXQiOjE1ODIyMjg4NzJ9.nRFtnGMO1DixHaBxlaUIB92UHoDrP-JQwVEhnWxieAk';
  let bookingId = {};
  const date = '2020-03-01';
  beforeAll(() => db.dbConnect());
  describe('Test the create api', () => {
    test('Test with all correct inputs', async () => {
      const res = await request(app)
        .post('/api/bookings/create')
        .set('Cookie', [`token=${token}`])
        .send(book);
      bookingId._id = res.body._id;
      expect(res.statusCode).toEqual(201);
    });
    test('Test with owner token as input', async () => {
      const res = await request(app)
        .post('/api/bookings/create')
        .set('Cookie', [
          `token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTRlZTFiYjRlNjYwZWFjOWJlZWVjMTgiLCJpYXQiOjE1ODIzMDIwMTJ9.exyG56i9yx5yH8ZysaTlYeDlOMd925B-R90sxjDhhTA`,
        ])
        .send(book);
      expect(res.statusCode).toEqual(401);
    });
  });
  describe('Test the cancel api', () => {
    test('Test with all correct inputs', async () => {
      const res = await request(app)
        .post('/api/bookings/cancel')
        .set('Cookie', [`token=${token}`])
        .send(bookingId);
      expect(res.statusCode).toEqual(200);
    });
    test('Test with invalid bookingId', async () => {
      const res = await request(app)
        .post('/api/bookings/cancel')
        .set('Cookie', [`token=${token}`])
        .send({ _id: '1234567890' });
      expect(res.statusCode).toEqual(400);
    });
    test('Test with deleted bookingId', async () => {
      const res = await request(app)
        .post('/api/bookings/cancel')
        .set('Cookie', [`token=${token}`])
        .send({ _id: '5e4fd28bb179fd4e4b0cc166' });
      expect(res.statusCode).toEqual(400);
    });
    test('Test with owner token as input', async () => {
      const res = await request(app)
        .post('/api/bookings/create')
        .set('Cookie', [
          `token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTRlZTFiYjRlNjYwZWFjOWJlZWVjMTgiLCJpYXQiOjE1ODIzMDIwMTJ9.exyG56i9yx5yH8ZysaTlYeDlOMd925B-R90sxjDhhTA`,
        ])
        .send(bookingId);
      expect(res.statusCode).toEqual(401);
    });
  });
  describe('Test the fetch booked api', () => {
    test('Test with all correct inputs', async () => {
      const res = await request(app)
        .post('/api/bookings/bookedslots')
        .set('Cookie', [`token=${token}`])
        .send({
          locationId: book.locationId,
          workspaceId: book.workspaceId,
          date,
        });
      expect(res.statusCode).toEqual(200);
    });
    test('Test with incorrect inputs', async () => {
      const res = await request(app)
        .post('/api/bookings/bookedslots')
        .set('Cookie', [`token=${token}`])
        .send({
          locationId: '5e4fd28bb179fd4e4b0cc166',
          workspaceId: book.workspaceId,
          date,
        });
      expect(res.statusCode).toEqual(200);
    });
    test('Test with incomplete inputs', async () => {
      const res = await request(app)
        .post('/api/bookings/bookedslots')
        .set('Cookie', [`token=${token}`])
        .send({
          locationId: '5e4fd28bb179fd4e4b0cc166',
          date,
        });
      expect(res.statusCode).toEqual(400);
    });
  });

  describe('Test the my bookings api', () => {
    test('Test with customer token as input', async () => {
      const res = await request(app)
        .get('/api/bookings/mybookings')
        .set('Cookie', [`token=${token}`]);
      expect(res.statusCode).toEqual(200);
    });
    test('Test with owner token as input', async () => {
      const res = await request(app)
        .get('/api/bookings/mybookings')
        .set('Cookie', [
          `token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTRlZTFiYjRlNjYwZWFjOWJlZWVjMTgiLCJpYXQiOjE1ODIzMDIwMTJ9.exyG56i9yx5yH8ZysaTlYeDlOMd925B-R90sxjDhhTA`,
        ]);
      expect(res.statusCode).toEqual(200);
    });
    test('Test with invalid token as input', async () => {
      const res = await request(app)
        .get('/api/bookings/mybookings')
        .set('Cookie', [`token=${''}`]);
      console.log(res.body);
      expect(res.statusCode).toEqual(401);
    });
    test('Test with invalid token as input', async () => {
      const res = await request(app)
        .get('/api/bookings/mybookings')
        .set('Cookie', [`token=${''}`]);
      console.log(res.body);
      expect(res.statusCode).toEqual(401);
    });
  });
  afterAll(() => {
    return Booking.deleteOne(bookingId, () => {
      return db.dbDisconnect();
    });
  });
});
