import request from 'supertest';
import db from '../../db';
import app from '../../app';

describe('Testing The Room apis', () => {
  beforeAll(() => db.dbConnect());
  let roomid;
  let floorid;
  describe('GET /Room', () => {
    it('responds with json if success', async () => {
      let locationid = '5e4fa6f02a13ec42809d31c5';
      let workspaceid = '5e4fa6f02a13ec42809d31c6';
      const res = await request(app).get(
        `/api/room/${locationid}/${workspaceid}/rooms`,
      );
      expect(res.status).toEqual(200);
      expect(res.header['content-type']).toMatch(/json/);
      expect(res.body).toBeTruthy();
    });

    it('responds with 404 location id is not present', async () => {
      let locationid = '1e4fa6f02a13ec42809d31c6';
      let workspaceid = '5e4fa6f02a13ec42809d31c6';
      const res = await request(app).get(
        `/api/room/${locationid}/${workspaceid}/rooms`,
      );
      expect(res.status).toEqual(404);
      expect(res.text).toEqual(
        `Error: Location Id doesn't exits ${locationid}`,
      );
    });

    it('responds with 404 workspace id is not present', async () => {
      let locationid = '5e4fa6f02a13ec42809d31c5';
      let workspaceid = '5e4fa6f02a13ec42809d31c4';
      const res = await request(app).get(
        `/api/room/${locationid}/${workspaceid}/rooms`,
      );
      expect(res.status).toEqual(404);
      expect(res.text).toEqual(
        `Error: Workspace Id doesn't exits ${workspaceid}`,
      );
    });
  });

  describe('POST /Room', () => {
    it('Creates A Room Successfully', async () => {
      let locationid = '5e4fa6f02a13ec42809d31c5';
      let workspaceid = '5e4fa6f02a13ec42809d31c6';
      const newRoom = {
        floor_name: 'Floor 10',
        name: 'Room 55',
        amenities: ['wifi', 'Projector'],
        capacity: 200,
        isActive: true,
        description: 'despgfcgfcfgcgf',
      };
      const res = await request(app)
        .post(`/api/room/${locationid}/${workspaceid}/rooms`)
        .send(newRoom);

      expect(res.status).toBe(201);
      if (res.body.rooms) {
        expect(res.body.name).toBe(newRoom.floor_name);
        expect(res.body.rooms.length).toBe(1);
        expect(res.body.rooms[0].name).toBe(newRoom.name);
        floorid = res.body._id;
        roomid = res.body.rooms[0]._id;
      } else {
        expect(res.body.name).toBe(newRoom.name);
        expect(res.body.capacity).toEqual(200);
        expect(res.body.isAvailable).toBeTruthy();
        roomid = res.body._id;
      }
    });
  });

  describe('PUT /Room', () => {
    it('Successfully updates a room', async () => {
      const updateRoom = {
        locationid: '5e4fa6f02a13ec42809d31c5',
        workspaceid: '5e4fa6f02a13ec42809d31c6',
        floorid: floorid || '5e4fce7811f11528db5c0b77',
        room: {
          name: 'Room 200',
          amenities: ['coffee', 'wifi', 'mad'],
          capacity: 2000000,
          isActive: true,
          description: 'desp',
        },
      };

      const res = await request(app)
        .put(`/api/room/${roomid}`)
        .send(updateRoom);

      expect(res.status).toBe(200);
      expect(res.body._id).toBe(updateRoom.locationid);
    });
  });

  describe('DELETE /Room', () => {
    it('Successfully Deletes a Room', async () => {
      const ids = {
        locationid: '5e4fa6f02a13ec42809d31c5',
        workspaceid: '5e4fa6f02a13ec42809d31c6',
        floorid: floorid || '5e4fce7811f11528db5c0b77',
      };
      const res = await request(app)
        .delete(`/api/room/${roomid}`)
        .send(ids);

      expect(res.status).toBe(200);
      expect(res.body._id).toBe(ids.locationid);
    });
  });

  afterAll(() => {
    return db.dbDisconnect();
  });
});
