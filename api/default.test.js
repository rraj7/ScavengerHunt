const request = require('supertest');
const app = require('./index');

describe('Tests', () => {
  test('Root should return 404', (done) => {
    request(app).get('/').then((response) => {
      expect(response.statusCode).toBe(404);
      done();
    });
  });

  test('There should be 10 landmarks in the database', (done) => {
    request(app).get('/landmarks').then((response) => {
      expect(response.body.length).toBe(10);
      done();
    });
  });
});