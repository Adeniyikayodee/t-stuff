const request = require('supertest');
const app = require('./app');

describe('Todos API', () => {
    it('GET /todos --> array of todos', () => {
        return request(app)
            .get('/todos')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({
                            id: expect.any(Number),
                            name: expect.any(String),
                            completed: expect.any(Boolean)
                        })
                    ])
                )
            })
    })

    it('GET /todos/id --> specific todos by ID', () => {
        return request(app)
            .get('/todos/1')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        name: expect.any(String),
                        completed: expect.any(Boolean)
                    })

                )
            })
    })

    it('GET /todos/id --> 404 if not found', () => {
        return request(app)
            .get('./todos/121')
            .expect(404);
    });

    it('POST /todos --> upload a task', () => {
        return request(app).post('./todos').send({
            name: "wash clothes"
        }).expect('Content-Type', /json/)
            .expect(201)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        name: 'wash clothes',
                        completed: false
                    })

                )
            })
    });

    it('GET /todos --> validate request body', () => {
        return request(app)
            .post('./todos')
            .send({ name: 123 })
            .expect(422);
    });
});