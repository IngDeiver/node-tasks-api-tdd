/* eslint-disable no-underscore-dangle */
/* eslint-disable jest/valid-expect-in-promise */
/* eslint-disable jest/expect-expect */
import supertest from 'supertest';
import expres from 'express';
import server from '../../../src/app';

let app: expres.Application;
let request: supertest.SuperTest<supertest.Test>;
const baseUri = '/api/task';
beforeAll(() => {
  app = server.app;
  request = supertest(app);
});

// list
it('should get list tasks', async () => {
  const response = await request.get(baseUri);
  expect(response.status).toBe(200);
  expect(response.body).toBeInstanceOf(Array);
});

// save
describe('should save and remove task', () => {
  it('should save with 200 status', async () => {
    const title = 'Task saved with unit tes';
    const response = await request.post(baseUri)
      .send({ title })
      .set('Accept', 'application/json');
    expect(response.status).toBe(200);
    expect(response.body.title).toBeDefined();
    expect(response.body.title).toEqual(title);

    // remove a taks saved
    const responseRemove = await request.delete(`/api/task/${response.body._id}`);
    expect(responseRemove.status).toBe(200);
    expect(responseRemove.body.title).toBeDefined();
  });

  it('should fail save without title property with 400 status', async () => {
    const response = await request.post(baseUri)
      .set('Accept', 'application/json');
    expect(response.status).toBe(400);
    expect(response.body.title).toBeUndefined();
  });
});

// get by id
describe('should get task by id', () => {
  it('should response with 200 status', async () => {
    const id = '5fe125f978a78f7dacf010a5';
    const response = await request.get(`/api/task/${id}`);
    expect(response.status).toBe(200);
  });

  it('should response with 404 status', async () => {
    const id = '5fe0287346956c638f701222';
    const response = await request.get(`/api/task/${id}`);
    expect(response.status).toBe(404);
    expect(response.body.title).toBeUndefined();
  });
});

// update
describe('should update a task', () => {
  it('should update with 200 status', async () => {
    const id: string = '5fe125f978a78f7dacf010a5';
    const task = { title: 'Task update with test' };
    const response = await request.put(`/api/task/${id}`)
      .send(task);
    expect(response.status).toBe(200);
    expect(response.body.title).toEqual(task.title);
  });

  it('should fail with 404 status', async () => {
    const id = '5fe0287346956c638f701bd2';
    const response = await request.put(`/api/task/${id}`)
      .send({ title: 'Task update with test' });
    expect(response.status).toBe(404);
    expect(response.body.title).toBeUndefined();
  });
});

// remove
describe('should remove a task', () => {
  it('should fail with 404 status', async () => {
    const id = '5fe0287346956c638f701bd2';
    const response = await request.delete(`/api/task/${id}`);
    expect(response.status).toBe(404);
    expect(response.body.title).toBeUndefined();
  });
});
