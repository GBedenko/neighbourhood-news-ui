'use strict'

const articlesMediator = require('../modules/articles-mediator')

describe('Adding a new article call to other microservice', async() => { 

	test('Adding a new article request', async done => {

                expect.assertions(1)

                const response = await articlesMediator.addArticle({"heading": "Test Heading"})
                
                // Expect to be undefined because remote API won't be running during test execution
                expect(response).toBeUndefined()
                
                done()
        })
        
        test('Adding an empty article is rejected and doesnt call other API', async done => {

                const response = await articlesMediator.addArticle({})
                                                        .then((response) => response)
                                                        .catch((reason) => reason)
                
                expect(response).toEqual(Error('Trying to add an empty object'))
                
                done()
	})
})

describe('Getting all articles call to other microservice', async() => { 

	test('Getting all articles returns an array', async done => {

                expect.assertions(1)
                
                const response = await articlesMediator.getAllArticles()
                
                // Expect to be undefined because remote API won't be running during test execution
                expect(response).toBeUndefined()
                
                done()
        })
        
        test('Getting all articles and sending a search criteria', async done => {

                expect.assertions(1)
                
                const response = await articlesMediator.getAllArticles({}, {})
                
                // Expect to be undefined because remote API won't be running during test execution
                expect(response).toBeUndefined()
                
                done()
        })
})

describe('Getting one article by id call to other microservice', async() => { 

	test('Getting one article by id returns the correct article', async done => {

                expect.assertions(1)
                        
                const response = await articlesMediator.getArticleByID(1234)
                
                // Expect to be undefined because remote API won't be running during test execution
                expect(response).toBeUndefined()
                
                done()
	})
})

describe('Updating an article call to other microservice', async() => { 

	test('Updating an article successfully calls the API for an update request', async done => {

                expect.assertions(1)
                                
                const response = await articlesMediator.updateArticle(1234, {"heading": "Updated Heading"})
                
                // Expect to be undefined because remote API won't be running during test execution
                expect(response).toBeUndefined()
                
                done()
	})
        
        test('Updating an article with an empty object is rejected and doesnt call other API', async done => {

                const response = await articlesMediator.updateArticle(1234, {})
                                                        .then((response) => response)
                                                        .catch((reason) => reason)
                
                expect(response).toEqual(Error('Trying to update an empty object'))
                
                done()
	})
})

describe('Deleting an article call to other microservice', async() => { 

	test('Deleting an article successfully calls the API for a delete request', async done => {

                expect.assertions(1)
                                        
                const response = await articlesMediator.deleteArticle(1234)
                
                // Expect to be undefined because remote API won't be running during test execution
                expect(response).toBeUndefined()
                
                done()
	})
})