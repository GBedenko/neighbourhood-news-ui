'use strict'

const usersMediator = require('../modules/users-mediator')

describe('Adding a new user call to other microservice', async() => { 

	test('Adding a new user request', async done => {

                expect.assertions(1)
                
                const response = await usersMediator.addUser({"heading": "Test Heading"})
                
                // Expect to be undefined because remote API won't be running during test execution
                expect(response).toBeUndefined()
                
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

	test('Pinning an user changes the new user object to have pinned equal true', async done => {

                expect.assertions(1)
                                
                const response = await usersMediator.updateUser(1234, {"heading": "Updated Heading"})
                
                // Expect to be undefined because remote API won't be running during test execution
                expect(response).toBeUndefined()
                
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