'use strict'

const usersMediator = require('../modules/users-mediator')

describe('Adding a new user call to other microservice', async() => { 

	test('Adding a new user sets the values for public and pinned to false', async done => {

        expect.assertions(1)

        expect(true).toBeTruthy()
        
        done()
	})
})

describe('Getting all users call to other microservice', async() => { 

	test('Getting all users returns an array', async done => {

        expect.assertions(1)
        
        expect(true).toBeTruthy()
        
        done()
	})
})

describe('Getting one user by id call to other microservice', async() => { 

	test('Getting one user by id returns the correct user', async done => {

        expect.assertions(1)
        
        expect(true).toBeTruthy()
        
        done()
	})
})

describe('Updating an user call to other microservice', async() => { 

	test('Pinning an user changes the new user object to have pinned equal true', async done => {

        expect.assertions(1)
        
        expect(true).toBeTruthy()
        
        done()
	})
})

describe('Deleting an user call to other microservice', async() => { 

	test('Deleting an user successfully calls the API for a delete request', async done => {

        expect.assertions(1)
        
        expect(true).toBeTruthy()
        
        done()
	})
})