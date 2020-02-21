/* eslint-disable */

import request from 'supertest';
import db from '../../db';
import app from '../../app';
import Location from '../../models/location';
import User from '../../models/user';
import jwt from 'jsonwebtoken';
import constants from '../../constants/token';

let locationid;
let workspaceid;

let userId;
let token;

const owner = {
  firstName: 'Owner',
  lastName: 'test',
  email: 'owner@test.com',
  password: 'test@1234',
  role: 2,
  phone: '+1234567890',
};

var sampleWorkspace = {
  workspace_name: 'Example Workspace',
  address: {
    full_address: 'Plot-5/87, Phase 4, blue one square',
    locality: 'Udyog Vihar',
    pincode: '713336',
  },
  location: 'EXAMPLECITY',
  operation_hours: [
    '09:00 - 23:00',
    '09:00 - 23:00',
    '09:00 - 23:00',
    '09:00 - 23:00',
    '09:00 - 23:00',
    'closed',
    'closed',
  ],
  owner: 'userID',
  workspace_amenities: ['Coffee', 'DustBin', 'Wifi', 'Parking'],
};

describe('Testing the Location apis', () => {
  beforeAll(() => db.dbConnect());
  beforeAll(() => User.deleteOne({ email: 'owner@test.com' }));

  test('Add with all correct values (Unauthenticated)', async () => {
    const res = await request(app)
      .post('/api/workspace/')
      .send(sampleWorkspace);
    expect(res.statusCode).toEqual(401);
  });

  test('Adding Owner to authenticateUser', async () => {
    const res = await request(app)
      .post('/api/users/register')
      .send(owner);
    expect(res.statusCode).toEqual(201);
    userId = res.body.user._id;
    console.log('UsersdsdsadddID ', userId);
  });
});

describe('Owner logged In...', () => {
  test('Generating Owner login Token', async () => {
    token = jwt.sign({ _id: userId }, constants.JWT_KEY);
    expect(token).not.toBe(undefined);
  });

  test('Add with all correct values (Logged in owner)', async () => {
    const res = await request(app)
      .post('/api/workspace/')
      .set('Cookie', [`token=${token}`])
      .send(sampleWorkspace);
    expect(res.statusCode).toEqual(201);
    expect(res.body.status).toBeTruthy();
    expect(res.body.location_id).toBeTruthy();
    expect(res.body.workspace_id).toBeTruthy();
    locationid = res.body.location_id;
    workspaceid = res.body.workspace_id;
  });

  test('Delete the workspace from the city (Wrong Location ID)', async () => {
    const res = await request(app).delete(
      `/api/workspace/wrongId/${workspaceid}`,
    );
    expect(res.statusCode).toEqual(400);
  });

  test('Delete the workspace from the city (Wrong Workspace ID)', async () => {
    const res = await request(app).delete(
      `/api/workspace/${locationid}/wrongworkspaceid`,
    );
    expect(res.statusCode).toEqual(400);
  });

  test('Delete the workspace from the city', async () => {
    const res = await request(app)
      .delete(`/api/workspace/${locationid}/${workspaceid}`)
      .set('Cookie', [`token=${token}`]);
    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toBeTruthy();
  });

  afterAll(() => {
    return User.deleteOne({ email: 'owner@test.com' }, () =>
      Location.deleteOne({ _id: locationid }, () => {
        return db.dbDisconnect();
      }),
    );
  });
});
