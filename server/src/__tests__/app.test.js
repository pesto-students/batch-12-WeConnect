import request from 'supertest';
import app from '../app';

describe('Testing the root path', () => {
    test('It should response the GET method', (done) => {
        request(app).get('/').then((response) => {
            expect(response.statusCode).toBe(200);
            done();
        });
    });
});
