const request = require('supertest');
const app = require('../../app');
const mongodb = require('../../providers/mongodb');

describe("demo_post()", () => {
  beforeAll(async () => {
    await mongodb.client.connect();
  });

  afterAll(async () => {
    await mongodb.client.close();
  });

  it("demo_post with valid request", async () => {
    const {body, statusCode} = await request(app)
      .post('/v1/')
      .send({
        startDate: "2017-01-26",
        endDate: "2018-02-02",
        minCount: 150,
        maxCount: 3000,
      });

    expect(statusCode)
      .toEqual(200);

    expect(body)
      .toHaveProperty('code');

    expect(body)
      .toHaveProperty('msg');

    expect(body)
      .toHaveProperty('records');

    expect(body.code).toEqual(0);
  });

  it("demo_post with invalid request", async () => {
    const {body, statusCode} = await request(app)
      .post('/v1/')
      .send({
        startDate: "2017-01-26",
        endDate: "2018-02-02",
        minCount: "150",
        maxCount: 3000,
      });

    expect(statusCode)
      .toEqual(400);

    expect(body)
      .toHaveProperty('code');

    expect(body)
      .toHaveProperty('msg');

    expect(body)
      .toHaveProperty('records');

    expect(body.code).toEqual(1);
  });

  it("demo_post with empty request", async () => {
    const {body, statusCode} = await request(app)
      .post('/v1/')
      .send({});

    expect(statusCode)
      .toEqual(400);

    expect(body)
      .toHaveProperty('code');

    expect(body)
      .toHaveProperty('msg');

    expect(body)
      .toHaveProperty('records');

    expect(body.code).toEqual(1);
  });

});

