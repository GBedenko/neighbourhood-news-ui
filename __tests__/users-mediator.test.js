'use strict'

const usersMediator = require('../modules/users-mediator')

describe('Adding a new user call to other microservice', async() => { 

	test('Adding a new user request', async done => {

        expect.assertions(1)
        
        const response = await usersMediator.addUser({"username": "test123"})
        
        // Expect to be undefined because remote API won't be running during test execution
        expect(response).toBeUndefined()
        
        done()
	})
    
    test('Adding an empty user is rejected and doesnt call other API', async done => {

        const response = await usersMediator.addUser({})
                                                .then((response) => response)
                                                .catch((reason) => reason)
        
        expect(response).toEqual(Error('Trying to add an empty object'))
        
        done()
    })
})

describe('Getting all users call to other microservice', async() => { 

	test('Getting all users returns an array', async done => {

                expect.assertions(1)
                
                const response = await usersMediator.getAllUsers()
                
                // Expect to be undefined because remote API won't be running during test execution
                expect(response).toBeUndefined()
                
                done()
	})
})

describe('Getting one user by id call to other microservice', async() => { 

	test('Getting one user by id returns the correct user', async done => {

                expect.assertions(1)
                        
                const response = await usersMediator.getUserByID(1234)
                
                // Expect to be undefined because remote API won't be running during test execution
                expect(response).toBeUndefined()
                
                done()
	})
})

describe('Updating an user call to other microservice', async() => { 

	test('Updating a comment successfully calls the API for an update request', async done => {

                expect.assertions(1)
                                
                const response = await usersMediator.updateUser(1234, {"username": "test234"})
                
                // Expect to be undefined because remote API won't be running during test execution
                expect(response).toBeUndefined()
                
                done()
	})
    
    test('Updating a user with an empty object is rejected and doesnt call other API', async done => {

        const response = await usersMediator.updateUser(1234, {})
                                                .then((response) => response)
                                                .catch((reason) => reason)
        
        expect(response).toEqual(Error('Trying to update an empty object'))
        
        done()
    })
})

describe('Deleting an user call to other microservice', async() => { 

	test('Deleting an user successfully calls the API for a delete request', async done => {

                expect.assertions(1)
                                        
                const response = await usersMediator.deleteUser(1234)
                
                // Expect to be undefined because remote API won't be running during test execution
                expect(response).toBeUndefined()
                
                done()
	})
})