// tests/app.test.js
import request from 'supertest';
import app from '../app.js';

describe('Task API', () => {
  it('creates then fetches a task', async () => {
    // create a task
    const resCreate = await request(app)
      .post('/tasks')
      .send({ title: 'CI task' });
    expect(resCreate.status).toBe(201);

    // list tasks
    const resList = await request(app).get('/tasks');
    expect(resList.status).toBe(200);
    expect(resList.body.length).toBe(1);
    expect(resList.body[0].title).toBe('CI task');
  });
});
