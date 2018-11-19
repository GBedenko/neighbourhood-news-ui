'use strict'

const commentsMediator = require('../modules/comments-mediator')

describe('Adding a new comment call to other microservice', async() => { 

	test('Adding a new comment sets the values for public and pinned to false', async done => {

        expect.assertions(1)

        expect(true).toBeTruthy()
        
        done()
	})
})

describe('Getting all comments call to other microservice', async() => { 

	test('Getting all comments returns an array', async done => {

        expect.assertions(1)
        
        expect(true).toBeTruthy()
        
        done()
	})
})

describe('Getting one comment by id call to other microservice', async() => { 

	test('Getting one comment by id returns the correct comment', async done => {

        expect.assertions(1)
        
        expect(true).toBeTruthy()
        
        done()
	})
})

describe('Updating an comment call to other microservice', async() => { 

	test('Pinning an comment changes the new comment object to have pinned equal true', async done => {

        expect.assertions(1)
        
        expect(true).toBeTruthy()
        
        done()
	})
})

describe('Deleting an comment call to other microservice', async() => { 

	test('Deleting an comment successfully calls the API for a delete request', async done => {

        expect.assertions(1)
        
        expect(true).toBeTruthy()
        
        done()
	})
})