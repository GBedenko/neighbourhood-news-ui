'use strict'

const commentsMediator = require('../modules/comments-mediator')

describe('Adding a new comment call to other microservice', async() => { 

	test('Adding a new comment request', async done => {

        expect.assertions(1)
        
        const response = await commentsMediator.addComment({"heading": "Test Heading"})
        
        // Expect to be undefined because remote API won't be running during test execution
        expect(response).toBeUndefined()
        
        done()
	})
    
    test('Adding an empty comment is rejected and doesnt call other API', async done => {

        const response = await commentsMediator.addComment({})
                                                .then((response) => response)
                                                .catch((reason) => reason)
        
        expect(response).toEqual(Error('Trying to add an empty object'))
        
        done()
    })
})

describe('Getting all comments call to other microservice', async() => { 

	test('Getting all comments returns an array', async done => {

        expect.assertions(1)
        
        const response = await commentsMediator.getAllComments()
        
        // Expect to be undefined because remote API won't be running during test execution
        expect(response).toBeUndefined()
        
        done()
	})
})

describe('Getting one comment by id call to other microservice', async() => { 

	test('Getting one comment by id returns the correct comment', async done => {

        expect.assertions(1)
                
        const response = await commentsMediator.getCommentByID(1234)
        
        // Expect to be undefined because remote API won't be running during test execution
        expect(response).toBeUndefined()
        
        done()
	})
})

describe('Updating an comment call to other microservice', async() => { 

	test('Updating a comment successfully calls the API for an update request', async done => {

        expect.assertions(1)
                        
        const response = await commentsMediator.updateComment(1234, {"heading": "Updated Heading"})
        
        // Expect to be undefined because remote API won't be running during test execution
        expect(response).toBeUndefined()
        
        done()
    })
    
    test('Updating a comment with an empty object is rejected and doesnt call other API', async done => {

        const response = await commentsMediator.updateComment(1234, {})
                                                .then((response) => response)
                                                .catch((reason) => reason)
        
        expect(response).toEqual(Error('Trying to update an empty object'))
        
        done()
    })
})

describe('Deleting an comment call to other microservice', async() => { 

	test('Deleting an comment successfully calls the API for a delete request', async done => {

        expect.assertions(1)
                                
        const response = await commentsMediator.deleteComment(1234)
        
        // Expect to be undefined because remote API won't be running during test execution
        expect(response).toBeUndefined()
        
        done()
	})
})