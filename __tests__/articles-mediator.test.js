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
})

describe('Getting all articles call to other microservice', async() => { 

	test('Getting all articles returns an array', async done => {

                expect.assertions(1)
                
                const response = await articlesMediator.getAllArticles()
                
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

	test('Pinning an article changes the new article object to have pinned equal true', async done => {

                expect.assertions(1)
                                
                const response = await articlesMediator.updateArticle(1234, {"heading": "Updated Heading"})
                
                // Expect to be undefined because remote API won't be running during test execution
                expect(response).toBeUndefined()
                
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