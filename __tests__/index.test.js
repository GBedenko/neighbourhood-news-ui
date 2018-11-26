'use strict'

// Testing endpoints requries supertest package
const request = require("supertest");

const index = require('../index')

jest.mock('../modules/articles-mediator')
jest.mock('../modules/comments-mediator')
jest.mock('../modules/events-mediator')
jest.mock('../modules/users-mediator')

// Test GET /all_posts
describe('GET /all_posts endpoint', async() => {

    afterEach(() => {
        index.close()
    });

    // Test that a request recieves the correct status code
	test('Requesting all posts returns a 200 status code', async done => {

        const response = await request(index).get("/all_posts")

        expect(response.status).toEqual(200)

        done()
    })
})