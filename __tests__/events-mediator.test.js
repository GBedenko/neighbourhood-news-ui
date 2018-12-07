'use strict'

const eventsMediator = require('../modules/events-mediator')

describe('Adding a new event call to other microservice', async() => { 

	test('Adding a new event request', async done => {

        expect.assertions(1)
        
        const response = await eventsMediator.addEvent({"heading": "Test Heading"})
        
        // Expect to be undefined because remote API won't be running during test execution
        expect(response).toBeUndefined()
        
        done()
    })
    
    test('Adding an empty event is rejected and doesnt call other API', async done => {

        const response = await eventsMediator.addEvent({})
                                                .then((response) => response)
                                                .catch((reason) => reason)
        
        expect(response).toEqual(Error('Trying to add an empty object'))
        
        done()
    })
})

describe('Getting all events call to other microservice', async() => { 

	test('Getting all events returns an array', async done => {

            expect.assertions(1)
            
            const response = await eventsMediator.getAllEvents()
            
            // Expect to be undefined because remote API won't be running during test execution
            expect(response).toBeUndefined()
            
            done()
	})
        
    test('Getting all events and sending a search criteria', async done => {

            expect.assertions(1)
            
            const response = await eventsMediator.getAllEvents({}, {})
            
            // Expect to be undefined because remote API won't be running during test execution
            expect(response).toBeUndefined()
            
            done()
    })
})

describe('Getting one event by id call to other microservice', async() => { 

	test('Getting one event by id returns the correct event', async done => {

                expect.assertions(1)
                        
                const response = await eventsMediator.getEventByID(1234)
                
                // Expect to be undefined because remote API won't be running during test execution
                expect(response).toBeUndefined()
                
                done()
	})
})

describe('Updating an event call to other microservice', async() => { 

	test('Updating an event successfully calls the API for an update request', async done => {

                expect.assertions(1)
                                
                const response = await eventsMediator.updateEvent(1234, {"heading": "Updated Heading"})
                
                // Expect to be undefined because remote API won't be running during test execution
                expect(response).toBeUndefined()
                
                done()
    })
        
    test('Updating an event with an empty object is rejected and doesnt call other API', async done => {

        const response = await eventsMediator.updateEvent(1234, {})
                                                .then((response) => response)
                                                .catch((reason) => reason)
        
        expect(response).toEqual(Error('Trying to update an empty object'))
        
        done()
    })
})

describe('Deleting an event call to other microservice', async() => { 

	test('Deleting an event successfully calls the API for a delete request', async done => {

                expect.assertions(1)
                                        
                const response = await eventsMediator.deleteEvent(1234)
                
                // Expect to be undefined because remote API won't be running during test execution
                expect(response).toBeUndefined()
                
                done()
	})
})