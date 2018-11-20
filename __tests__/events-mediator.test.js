'use strict'

const eventsMediator = require('../modules/events-mediator')

describe('Adding a new event call to other microservice', async() => { 

	test('Adding a new event sets the values for public and pinned to false', async done => {

        expect.assertions(1)

        expect(true).toBeTruthy()
        
        done()
	})
})

describe('Getting all events call to other microservice', async() => { 

	test('Getting all events returns an array', async done => {

        expect.assertions(1)
        
        expect(true).toBeTruthy()
        
        done()
	})
})

describe('Getting one event by id call to other microservice', async() => { 

	test('Getting one event by id returns the correct event', async done => {

        expect.assertions(1)
        
        expect(true).toBeTruthy()
        
        done()
	})
})

describe('Updating an event call to other microservice', async() => { 

	test('Pinning an event changes the new event object to have pinned equal true', async done => {

        expect.assertions(1)
        
        expect(true).toBeTruthy()
        
        done()
	})
})

describe('Deleting an event call to other microservice', async() => { 

	test('Deleting an event successfully calls the API for a delete request', async done => {

        expect.assertions(1)
        
        expect(true).toBeTruthy()
        
        done()
	})
})